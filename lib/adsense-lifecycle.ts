type AdQueue = { push: (request: Record<string, never>) => unknown };
type AdWindow = Window & { adsbygoogle?: AdQueue };

// A DOM node may survive StrictMode effect replay. Never enqueue it twice.
const requestedAds = new WeakSet<HTMLElement>();

export default function observeAd(ad: HTMLElement, container: HTMLElement): () => void {
  const win = window as AdWindow;
  let disposed = false;
  let inView = typeof IntersectionObserver === 'undefined';
  let intersection: IntersectionObserver | undefined;
  let resize: ResizeObserver | undefined;

  // requestAd and cleanup share listeners so successful requests release all observers.
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const onChange = () => requestAd();

  const cleanup = () => {
    disposed = true;
    intersection?.disconnect();
    resize?.disconnect();
    window.removeEventListener('resize', onChange);
    window.removeEventListener('toolsify:consent-change', onChange);
    window.removeEventListener('storage', onChange);
  };

  function requestAd() {
    if (disposed || !inView || !ad.isConnected || ad.getBoundingClientRect().width <= 0) return;
    if (requestedAds.has(ad) || ad.hasAttribute('data-adsbygoogle-status')) {
      cleanup();
      return;
    }

    try {
      const saved = window.localStorage.getItem('user_consent_preferences');
      if (saved) {
        const consent: unknown = JSON.parse(saved);
        if (
          !consent ||
          typeof consent !== 'object' ||
          !('preferences' in consent) ||
          !consent.preferences ||
          typeof consent.preferences !== 'object' ||
          !('advertising' in consent.preferences) ||
          typeof consent.preferences.advertising !== 'boolean' ||
          !consent.preferences.advertising
        ) {
          return;
        }
      }
    } catch {
      // Unreadable preferences must not silently override a previous refusal.
      return;
    }

    // The standard queue survives slow script loading without a polling deadline.
    // Claim before push: synchronous callbacks and StrictMode must not duplicate it.
    requestedAds.add(ad);
    try {
      const pendingRequests: Record<string, never>[] = [];
      win.adsbygoogle = win.adsbygoogle || pendingRequests;
      win.adsbygoogle.push({});
    } catch (error) {
      // A throwing queue may already have processed the request. Do not retry it.
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('AdSense initialization failed', error);
      }
    }
    cleanup();
  }

  window.addEventListener('toolsify:consent-change', onChange);
  window.addEventListener('storage', onChange);
  window.addEventListener('resize', onChange);
  if (typeof ResizeObserver !== 'undefined') {
    resize = new ResizeObserver(requestAd);
    resize.observe(container);
    resize.observe(ad);
  }
  if (typeof IntersectionObserver !== 'undefined') {
    intersection = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        requestAd();
      },
      { rootMargin: '300px 0px' },
    );
    intersection.observe(container);
  }
  requestAd();
  return cleanup;
}
