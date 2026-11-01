const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync('lib/pagination.ts', 'utf8');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
  exports: exportsObject,
});
const parsePageNumber = exportsObject.default;
test('only canonical positive safe integers are valid page segments', () => {
  for (const invalid of [
    undefined,
    '',
    '0',
    '-1',
    '1.5',
    '1e2',
    '01',
    '+1',
    ' 1',
    'Infinity',
    'NaN',
    '9007199254740992',
  ]) {
    assert.equal(parsePageNumber(invalid), null, String(invalid));
  }
  assert.equal(parsePageNumber('1'), 1);
  assert.equal(parsePageNumber('42'), 42);
});
