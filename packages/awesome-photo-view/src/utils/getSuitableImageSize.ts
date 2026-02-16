import { longModeRatio } from '../variables';
import getRotateSize from './getRotateSize';
import { getViewportWidth, getViewportHeight } from './getViewportSize';

/**
 * Get suitable image size for display
 */
export default function getSuitableImageSize(naturalWidth: number, naturalHeight: number, rotate: number) {
  const [currentWidth, currentHeight, isVertical] = getRotateSize(rotate, getViewportWidth(), getViewportHeight());

  let y = 0;
  let width = currentWidth;
  let height = currentHeight;

  // Adaptive width/height
  const autoWidth = (naturalWidth / naturalHeight) * currentHeight;
  const autoHeight = (naturalHeight / naturalWidth) * currentWidth;

  if (naturalWidth < currentWidth && naturalHeight < currentHeight) {
    width = naturalWidth;
    height = naturalHeight;
  } else if (naturalWidth < currentWidth && naturalHeight >= currentHeight) {
    width = autoWidth;
  } else if (naturalWidth >= currentWidth && naturalHeight < currentHeight) {
    height = autoHeight;
  } else if (naturalWidth / naturalHeight > currentWidth / currentHeight) {
    height = autoHeight;
  }
  // Long image mode
  else if (naturalHeight / naturalWidth >= longModeRatio && !isVertical) {
    height = autoHeight;
    y = (height - currentHeight) / 2;
  } else {
    width = autoWidth;
  }
  return {
    width,
    height,
    x: 0,
    y,
    pause: true,
  };
}
