import { describe, it, expect } from 'vitest';
import { getReachType, computePositionEdge } from '../utils/edgeHandle';

describe('computePositionEdge', () => {
  it('returns edge type 1 and position 0 when content is smaller than container', () => {
    // size=100, scale=1, innerSize=200 -> content (100) < container (200)
    const [edge, pos] = computePositionEdge(50, 1, 100, 200);
    expect(edge).toBe(1);
    expect(pos).toBe(0);
  });

  it('returns undefined edge when content overflows and is within bounds', () => {
    // size=400, scale=1, innerSize=200 -> content (400) > container (200)
    // outOffset = (400-200)/2 = 100
    // position=50 -> 50 > 0, outOffset - position = 100 - 50 = 50 > 0, so not at edge
    const [edge, pos] = computePositionEdge(50, 1, 400, 200);
    expect(edge).toBeUndefined();
    expect(pos).toBe(50);
  });

  it('returns edge type 2 when at left/top edge', () => {
    // size=400, scale=1, innerSize=200 -> outOffset = 100
    // position=150 > 0, outOffset - position = 100 - 150 = -50 <= 0 -> edge 2
    const [edge, pos] = computePositionEdge(150, 1, 400, 200);
    expect(edge).toBe(2);
    expect(pos).toBe(100); // clamped to outOffset
  });

  it('returns edge type 3 when at right/bottom edge', () => {
    // position=-150 < 0, outOffset + position = 100 + (-150) = -50 <= 0 -> edge 3
    const [edge, pos] = computePositionEdge(-150, 1, 400, 200);
    expect(edge).toBe(3);
    expect(pos).toBe(-100); // clamped to -outOffset
  });

  it('accounts for scale factor', () => {
    // size=200, scale=2, innerSize=200 -> currentWidth = 400, outOffset = 100
    const [edge, pos] = computePositionEdge(0, 2, 200, 200);
    expect(edge).toBeUndefined();
    expect(pos).toBe(0);
  });
});

describe('getReachType', () => {
  it('returns "x" when horizontal edge reached with horizontal touch', () => {
    expect(getReachType(1, 1, undefined, undefined)).toBe('x');
  });

  it('returns "x" when reachPosition is already "x"', () => {
    expect(getReachType(0, undefined, undefined, 'x')).toBe('x');
  });

  it('returns "y" when vertical edge reached with vertical touch (push up)', () => {
    expect(getReachType(2, undefined, 1, undefined)).toBe('y');
  });

  it('returns "y" when vertical edge reached with vertical touch (pull down)', () => {
    expect(getReachType(3, undefined, 1, undefined)).toBe('y');
  });

  it('returns "y" when reachPosition is already "y"', () => {
    expect(getReachType(0, undefined, undefined, 'y')).toBe('y');
  });

  it('returns undefined when no edge is reached', () => {
    expect(getReachType(0, undefined, undefined, undefined)).toBeUndefined();
  });

  it('returns undefined when horizontal edge but vertical touch', () => {
    // touch state 2 (vertical) with horizontal edge -- not a horizontal reach
    expect(getReachType(2, 1, undefined, undefined)).toBeUndefined();
  });
});
