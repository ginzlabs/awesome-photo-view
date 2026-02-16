/**
 * Get width and height after rotation
 */
export default function getRotateSize(rotate: number, width: number, height: number) {
  const isVertical = rotate % 180 !== 0;

  // Swap dimensions if image is vertical
  if (isVertical) {
    return [height, width, isVertical] as const;
  }

  return [width, height, isVertical] as const;
}
