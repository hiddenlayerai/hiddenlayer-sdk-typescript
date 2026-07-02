import { warnBeta, checkBetaEndpoint, _resetWarnedForTesting } from '@hiddenlayerai/hiddenlayer-sdk/lib/beta';

const betaMessage = (name: string) =>
  `[BETA] ${name}: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.`;

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

  test('emits a warning for a static beta path', () => {
    checkBetaEndpoint('/detection/v2/request-evaluations');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(betaMessage('Runtime.evaluateRequest'));
  });

  test('emits a warning for a dynamic beta path with a substituted parameter', () => {
    checkBetaEndpoint('/evaluations/v1/red-team/abc123/status');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(betaMessage('RedTeam.retrieveStatus'));
  });

  test('emits a warning for a dynamic beta path on a single-parameter endpoint', () => {
    checkBetaEndpoint('/evaluations/v1/red-team/abc123');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(betaMessage('RedTeam.retrieveEvaluationResults'));
  });

  test('ignores a trailing query string when matching', () => {
    checkBetaEndpoint('/detection/v2/request-evaluations?foo=bar');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(betaMessage('Runtime.evaluateRequest'));
  });

  test('does not emit a warning for a non-beta path', () => {
    checkBetaEndpoint('/models/v2/list');
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  test('does not emit a warning when a literal segment differs', () => {
    checkBetaEndpoint('/evaluations/v1/red-team/abc123/not-a-real-action');
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  test('does not emit a warning when segment counts differ', () => {
    checkBetaEndpoint('/evaluations/v1/red-team/abc123/status/extra');
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  test('does not emit a warning for undefined path', () => {
    checkBetaEndpoint(undefined);
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  test('deduplicates warnings through warnBeta mechanism', () => {
    checkBetaEndpoint('/evaluations/v1/red-team/abc123/status');
    checkBetaEndpoint('/evaluations/v1/red-team/def456/status');
    checkBetaEndpoint('/evaluations/v1/red-team/ghi789/status');
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
