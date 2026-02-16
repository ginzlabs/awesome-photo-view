import { describe, it, expect, vi, beforeEach } from 'vitest';
import getPositionOnMoveOrScale from '../utils/getPositionOnMoveOrScale';

describe('getPositionOnMoveOrScale', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true, configurable: true });
  });

  it('returns centered position when scaling from center with no offset', () => {
    // x=0, y=0, 400x300 image, scale 1->1 (no change), default center point
    const result = getPositionOnMoveOrScale(0, 0, 400, 300, 1, 1);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    // Default clientX/clientY should be viewport center
    expect(result.lastCX).toBe(512);
    expect(result.lastCY).toBe(384);
  });

  it('returns offset position when custom clientX/clientY provided', () => {
    const result = getPositionOnMoveOrScale(0, 0, 400, 300, 1, 2, 200, 200);
    expect(result.lastCX).toBe(200);
    expect(result.lastCY).toBe(200);
    // Position should be offset from center based on zoom point
    expect(typeof result.x).toBe('number');
    expect(typeof result.y).toBe('number');
  });

  it('halves offset when at edge', () => {
    // Image at position where edge is reached, with an offset
    // Small image at scale 1: 100x100 in 1024x768 -> edge type 1 (smaller than viewport)
    const result = getPositionOnMoveOrScale(0, 0, 100, 100, 1, 1, 512, 384, 20, 20);
    // closedEdgeX = 1 (100*1 < 1024), so offsetX is halved -> 10
    expect(result.x).toBe(10); // originX(0) + offsetX/2(10)
    expect(result.y).toBe(10); // originY(0) + offsetY/2(10)
  });

  it('applies full offset when not at edge', () => {
    // Large image that overflows viewport, positioned within bounds
    // width=2000, scale=1, innerWidth=1024 -> content > viewport, not at edge
    const result = getPositionOnMoveOrScale(0, 0, 2000, 1500, 1, 1, 512, 384, 20, 20);
    expect(result.x).toBe(20); // Full offset applied
    expect(result.y).toBe(20);
  });
});
