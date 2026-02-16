import { describe, it, expect } from 'vitest';
import { limitNumber, limitScale } from '../utils/limitTarget';

describe('limitNumber', () => {
  it('returns value when within range', () => {
    expect(limitNumber(5, 0, 10)).toBe(5);
  });

  it('clamps to min when value is below', () => {
    expect(limitNumber(-5, 0, 10)).toBe(0);
  });

  it('clamps to max when value is above', () => {
    expect(limitNumber(15, 0, 10)).toBe(10);
  });

  it('returns min when min equals max', () => {
    expect(limitNumber(5, 3, 3)).toBe(3);
  });

  it('handles negative ranges', () => {
    expect(limitNumber(-5, -10, -1)).toBe(-5);
    expect(limitNumber(-15, -10, -1)).toBe(-10);
    expect(limitNumber(0, -10, -1)).toBe(-1);
  });
});

describe('limitScale', () => {
  // minScale = 1, maxScale = 6 from variables

  it('returns scale when within default bounds', () => {
    expect(limitScale(3)).toBe(3);
  });

  it('clamps to minScale (1) when below', () => {
    expect(limitScale(0.5)).toBe(1);
  });

  it('clamps to maxScale (6) when above with no custom max', () => {
    expect(limitScale(10)).toBe(6);
  });

  it('uses custom max when larger than maxScale', () => {
    // If image is very large, max can exceed maxScale
    expect(limitScale(8, 10)).toBe(8);
  });

  it('applies buffer to expand range', () => {
    // With buffer 0.2: min = 1 * (1-0.2) = 0.8, max = 6 * (1+0.2) = 7.2
    const result = limitScale(0.9, 0, 0.2);
    expect(result).toBe(0.9);
  });
});
