import type { MutableRefObject } from 'react';
import { getViewportWidth, getViewportHeight } from '../utils/getViewportSize';
import useAnimationOrigin from './useAnimationOrigin';
import useTargetScale from './useTargetScale';

export default function useAnimationPosition(
  visible: boolean | undefined,
  originRef: MutableRefObject<HTMLElement | null> | undefined,
  loaded: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
  speed: number,
  updateEasing: (pause: boolean) => void,
  isActive: boolean,
) {
  // Delayed width/height update
  const [autoWidth, autoHeight, autoScale] = useTargetScale(width, height, scale, speed, updateEasing);
  // Animation origin handling
  const [easingMode, originRect] = useAnimationOrigin(visible, originRef, loaded, speed, updateEasing, isActive);

  // Calculate animation position
  const { T, L, W, H, FIT } = originRect;
  // Offset, x: 0, y: 0 centered as initial
  const centerWidth = getViewportWidth() / 2;
  const centerHeight = getViewportHeight() / 2;
  const offsetX = centerWidth - (width * scale) / 2;
  const offsetY = centerHeight - (height * scale) / 2;
  // Thumbnail state
  const miniMode = easingMode < 3 || easingMode > 4;
  // Use thumbnail position if available, otherwise center
  const translateX = miniMode ? (W ? L : centerWidth) : x + offsetX;
  const translateY = miniMode ? (W ? T : centerHeight) : y + offsetY;

  // Minimum scale
  const minScale = W / (width * scale) || 0.01;

  // Adapt objectFit to maintain thumbnail aspect ratio
  const currentHeight = miniMode && FIT ? autoWidth * (H / W) : autoHeight;
  // No scaling on initial load
  const currentScale = easingMode === 0 ? autoScale : miniMode ? minScale : autoScale;
  const opacity = miniMode ? (FIT ? 1 : 0) : 1;

  return [translateX, translateY, autoWidth, currentHeight, currentScale, opacity, easingMode, FIT] as const;
}
