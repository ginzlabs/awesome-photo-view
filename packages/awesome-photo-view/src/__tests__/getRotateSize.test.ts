import { describe, it, expect } from 'vitest';
import getRotateSize from '../utils/getRotateSize';

describe('getRotateSize', () => {
  it('returns original dimensions at 0 degrees', () => {
    const [w, h, isVertical] = getRotateSize(0, 800, 600);
    expect(w).toBe(800);
    expect(h).toBe(600);
    expect(isVertical).toBe(false);
  });

  it('returns original dimensions at 360 degrees', () => {
    const [w, h, isVertical] = getRotateSize(360, 800, 600);
    expect(w).toBe(800);
    expect(h).toBe(600);
    expect(isVertical).toBe(false);
  });

  it('swaps dimensions at 90 degrees', () => {
    const [w, h, isVertical] = getRotateSize(90, 800, 600);
    expect(w).toBe(600);
    expect(h).toBe(800);
    expect(isVertical).toBe(true);
  });

  it('returns original dimensions at 180 degrees', () => {
    const [w, h, isVertical] = getRotateSize(180, 800, 600);
    expect(w).toBe(800);
    expect(h).toBe(600);
    expect(isVertical).toBe(false);
  });

  it('swaps dimensions at 270 degrees', () => {
    const [w, h, isVertical] = getRotateSize(270, 800, 600);
    expect(w).toBe(600);
    expect(h).toBe(800);
    expect(isVertical).toBe(true);
  });

  it('handles negative rotation (-90)', () => {
    const [w, h, isVertical] = getRotateSize(-90, 800, 600);
    expect(w).toBe(600);
    expect(h).toBe(800);
    expect(isVertical).toBe(true);
  });
});
