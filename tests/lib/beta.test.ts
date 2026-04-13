import { warnBeta, checkBetaEndpoint, _resetWarnedForTesting } from '@hiddenlayerai/hiddenlayer-sdk/lib/beta';
import { BETA_ENDPOINTS } from '@hiddenlayerai/hiddenlayer-sdk/lib/beta-endpoints';

describe('warnBeta', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test('emits a warning on first call', () => {
    warnBeta('Foo.firstCall');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      '[BETA] Foo.firstCall: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.',
    );
  });

  test('does not emit duplicate warnings for the same method', () => {
    warnBeta('Bar.dedup');
    warnBeta('Bar.dedup');
    warnBeta('Bar.dedup');
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  test('emits separate warnings for different methods', () => {
    warnBeta('Baz.alpha');
    warnBeta('Baz.bravo');
    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenNthCalledWith(
      1,
      '[BETA] Baz.alpha: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.',
    );
    expect(warnSpy).toHaveBeenNthCalledWith(
      2,
      '[BETA] Baz.bravo: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.',
    );
  });
});

describe('checkBetaEndpoint', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    _resetWarnedForTesting();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  const betaEntries = Object.entries(BETA_ENDPOINTS);
  const maybeTest = betaEntries.length > 0 ? test : test.skip;

  maybeTest('emits a warning for a known beta path', () => {
    const [knownPath, knownName] = betaEntries[0]!;
    checkBetaEndpoint(knownPath);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      `[BETA] ${knownName}: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.`,
    );
  });

  test('does not emit a warning for a non-beta path', () => {
    checkBetaEndpoint('/models/v2/list');
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  test('does not emit a warning for undefined path', () => {
    checkBetaEndpoint(undefined);
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  maybeTest('deduplicates warnings through warnBeta mechanism', () => {
    const [knownPath] = betaEntries[0]!;
    checkBetaEndpoint(knownPath);
    checkBetaEndpoint(knownPath);
    checkBetaEndpoint(knownPath);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
