/**
 * Whether the device supports touch
 */
const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

export default isTouchDevice;
