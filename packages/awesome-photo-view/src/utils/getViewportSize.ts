/**
 * Safely get viewport width (SSR-safe)
 */
export function getViewportWidth(): number {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
}

/**
 * Safely get viewport height (SSR-safe)
 */
export function getViewportHeight(): number {
  return typeof window !== 'undefined' ? window.innerHeight : 0;
}
