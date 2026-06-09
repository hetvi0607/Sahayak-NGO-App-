import { describe, expect, it } from 'vitest';

describe('frontend smoke', () => {
  it('keeps test runner configured', () => {
    expect('SahayaK').toContain('SahayaK');
  });
});
