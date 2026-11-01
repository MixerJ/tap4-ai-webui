const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { describe, it } = require('node:test');
const ts = require('typescript');

const source = fs.readFileSync('lib/adsense-lifecycle.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

// Each fixture gets a fresh module and DOM mocks. No real script or network is loaded.
function createFixture({ width = 320, consent = null, queue } = {}) {
  const listeners = new Map();
  let intersectionObserver;
  let resizeObserver;
  let currentWidth = width;
  let savedConsent = consent;
  const win = {
    adsbygoogle: queue,
    localStorage: { getItem: () => savedConsent },
    addEventListener(event, listener) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(listener);
    },
    removeEventListener(event, listener) {
      listeners.get(event)?.delete(listener);
    },
  };
  const context = {
    exports: {},
    window: win,
    process: { env: { NODE_ENV: 'test' } },
    IntersectionObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.disconnected = false;
        intersectionObserver = this;
      }
      observe() {}
      disconnect() {
        this.disconnected = true;
      }
    },
    ResizeObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.disconnected = false;
        resizeObserver = this;
      }
      observe() {}
      disconnect() {
        this.disconnected = true;
      }
    },
  };
  vm.runInNewContext(compiled, context);
  const ad = {
    isConnected: true,
    getBoundingClientRect: () => ({ width: currentWidth }),
    hasAttribute: () => false,
  };
  return {
    ad,
    win,
    attach: (node = ad) => context.exports.default(node, {}),
    view: (visible) => intersectionObserver.callback([{ isIntersecting: visible }]),
    resize(newWidth) {
      currentWidth = newWidth;
      resizeObserver.callback();
    },
    setConsent(value) {
      savedConsent = value;
      [...(listeners.get('toolsify:consent-change') || [])].forEach((listener) => listener());
    },
    assertCleanedUp() {
      assert.equal(
        [...listeners.values()].reduce((total, set) => total + set.size, 0),
        0,
      );
      assert.equal(intersectionObserver.disconnected, true);
      assert.equal(resizeObserver.disconnected, true);
    },
  };
}

const preferences = (advertising) => JSON.stringify({ preferences: { advertising } });

describe('AdSense visibility and deferred loading', () => {
  it('waits for a nonzero width and queues without needing the script loaded', () => {
    const fixture = createFixture({ width: 0 });
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle, undefined);
    fixture.resize(320);
    assert.equal(fixture.win.adsbygoogle.length, 1);
    fixture.assertCleanedUp();
  });

  it('waits while offscreen even when width is available', () => {
    const fixture = createFixture();
    fixture.attach();
    fixture.view(false);
    fixture.resize(320);
    assert.equal(fixture.win.adsbygoogle, undefined);
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle.length, 1);
  });

  it('does not request an ad for detached DOM', () => {
    const fixture = createFixture();
    fixture.ad.isConnected = false;
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle, undefined);
  });
});

describe('AdSense request ownership and cleanup', () => {
  it('does not duplicate a push after observer callbacks or StrictMode effect replay', () => {
    const fixture = createFixture();
    const cleanup = fixture.attach();
    fixture.view(true);
    fixture.resize(640);
    fixture.view(true);
    cleanup();
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle.length, 1);
    fixture.assertCleanedUp();
  });

  it('releases resources on unmount and ignores queued observer callbacks', () => {
    const fixture = createFixture();
    const cleanup = fixture.attach();
    cleanup();
    fixture.assertCleanedUp();
    fixture.view(true);
    fixture.resize(640);
    assert.equal(fixture.win.adsbygoogle, undefined);
  });

  it('permits a separate request for a replacement slot DOM node', () => {
    const fixture = createFixture();
    fixture.attach();
    fixture.view(true);
    fixture.attach({ ...fixture.ad });
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle.length, 2);
  });

  it('respects the Google processed marker', () => {
    const fixture = createFixture();
    fixture.ad.hasAttribute = (name) => name === 'data-adsbygoogle-status';
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle, undefined);
    fixture.assertCleanedUp();
  });

  it('never retries a throwing queue that may already have accepted the request', () => {
    let calls = 0;
    const fixture = createFixture({
      queue: {
        push() {
          calls += 1;
          throw new Error('Mock queue failure');
        },
      },
    });
    fixture.attach();
    fixture.view(true);
    fixture.assertCleanedUp();
    fixture.attach();
    fixture.view(true);
    assert.equal(calls, 1);
  });
});

describe('AdSense consent changes', () => {
  it('pauses on explicit refusal and resumes after a valid acceptance event', () => {
    const fixture = createFixture({ consent: preferences(false) });
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle, undefined);
    fixture.setConsent(preferences(true));
    assert.equal(fixture.win.adsbygoogle.length, 1);
  });

  it('waits for valid preferences when stored consent is malformed', () => {
    const fixture = createFixture({ consent: 'bad json' });
    fixture.attach();
    fixture.view(true);
    assert.equal(fixture.win.adsbygoogle, undefined);
    fixture.setConsent(preferences(true));
    assert.equal(fixture.win.adsbygoogle.length, 1);
  });

  it('rechecks refusal when a hidden ad becomes wide enough', () => {
    const fixture = createFixture({ width: 0 });
    fixture.attach();
    fixture.view(true);
    fixture.setConsent(preferences(false));
    fixture.resize(320);
    assert.equal(fixture.win.adsbygoogle, undefined);
  });
});
