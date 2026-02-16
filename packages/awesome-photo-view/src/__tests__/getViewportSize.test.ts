import { describe, it, expect, vi, afterEach } from 'vitest';
import { getViewportWidth, getViewportHeight } from '../utils/getViewportSize';

describe('getViewportSize', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getViewportWidth', () => {
    it('returns window.innerWidth when window is defined', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
      expect(getViewportWidth()).toBe(1024);
    });

    it('returns 0 when window is undefined (SSR)', () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error -- simulating SSR
      delete globalThis.window;
      expect(getViewportWidth()).toBe(0);
      globalThis.window = originalWindow;
    });
  });

  describe('getViewportHeight', () => {
    it('returns window.innerHeight when window is defined', () => {
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true, configurable: true });
      expect(getViewportHeight()).toBe(768);
    });

    it('returns 0 when window is undefined (SSR)', () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error -- simulating SSR
      delete globalThis.window;
      expect(getViewportHeight()).toBe(0);
      globalThis.window = originalWindow;
    });
  });
});
