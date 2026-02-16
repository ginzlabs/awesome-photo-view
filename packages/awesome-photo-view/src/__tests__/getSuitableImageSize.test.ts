import { describe, it, expect, vi, beforeEach } from 'vitest';
import getSuitableImageSize from '../utils/getSuitableImageSize';

describe('getSuitableImageSize', () => {
  beforeEach(() => {
    // Simulate a 1024x768 viewport
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true, configurable: true });
  });

  it('returns natural dimensions when image is smaller than viewport', () => {
    const result = getSuitableImageSize(400, 300, 0);
    expect(result.width).toBe(400);
    expect(result.height).toBe(300);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.pause).toBe(true);
  });

  it('scales down wide images to fit viewport width', () => {
    // Wide image: 2000x500, viewport 1024x768
    // naturalWidth >= currentWidth, naturalHeight < currentHeight
    // -> height = autoHeight = (500 / 2000) * 1024 = 256
    const result = getSuitableImageSize(2000, 500, 0);
    expect(result.width).toBe(1024);
    expect(result.height).toBe(256);
  });

  it('scales down tall images to fit viewport height', () => {
    // Tall image: 400x2000, viewport 1024x768
    // naturalWidth < currentWidth, naturalHeight >= currentHeight
    // -> width = autoWidth = (400 / 2000) * 768 = 153.6
    const result = getSuitableImageSize(400, 2000, 0);
    expect(result.width).toBeCloseTo(153.6);
    expect(result.height).toBe(768);
  });

  it('scales large images maintaining aspect ratio', () => {
    // Large landscape: 4000x3000, viewport 1024x768
    // Both exceed viewport, aspect wider than viewport -> height = autoHeight
    const result = getSuitableImageSize(4000, 3000, 0);
    expect(result.width).toBe(1024);
    expect(result.height).toBe(768);
  });

  it('swaps viewport dimensions when rotated 90 degrees', () => {
    // At 90 degrees, viewport dims swap: currentWidth=768, currentHeight=1024
    // Small image 200x200 - fits in both dims
    const result = getSuitableImageSize(200, 200, 90);
    expect(result.width).toBe(200);
    expect(result.height).toBe(200);
  });

  it('always returns x: 0 and pause: true', () => {
    const result = getSuitableImageSize(800, 600, 0);
    expect(result.x).toBe(0);
    expect(result.pause).toBe(true);
  });
});
