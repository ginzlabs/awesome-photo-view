import { longModeRatio } from '../variables';
import { computePositionEdge } from './edgeHandle';
import { getViewportWidth, getViewportHeight } from './getViewportSize';

/**
 * Get the center point after move or scale
 */
export default function getPositionOnMoveOrScale(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
  toScale: number,
  clientX: number = getViewportWidth() / 2,
  clientY: number = getViewportHeight() / 2,
  offsetX: number = 0,
  offsetY: number = 0,
) {
  // Whether touching edge
  const [closedEdgeX] = computePositionEdge(x, toScale, width, getViewportWidth());
  const [closedEdgeY] = computePositionEdge(y, toScale, height, getViewportHeight());

  const centerClientX = getViewportWidth() / 2;
  const centerClientY = getViewportHeight() / 2;

  // Coordinate offset
  const lastPositionX = centerClientX + x;
  const lastPositionY = centerClientY + y;

  // Offset position
  const originX = clientX - (clientX - lastPositionX) * (toScale / scale) - centerClientX;
  const originY = clientY - (clientY - lastPositionY) * (toScale / scale) - centerClientY;
  // No horizontal feedback in long image mode
  const longModeEdge = height / width >= longModeRatio && width * toScale === getViewportWidth();
  // Halve distance when exceeding edge
  return {
    x: originX + (longModeEdge ? 0 : closedEdgeX ? offsetX / 2 : offsetX),
    y: originY + (closedEdgeY ? offsetY / 2 : offsetY),
    lastCX: clientX,
    lastCY: clientY,
  };
}
