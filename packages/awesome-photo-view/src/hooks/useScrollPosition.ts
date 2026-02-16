import { computePositionEdge } from '../utils/edgeHandle';
import getPositionOnMoveOrScale from '../utils/getPositionOnMoveOrScale';
import getRotateSize from '../utils/getRotateSize';
import { getViewportWidth, getViewportHeight } from '../utils/getViewportSize';
import { defaultSpeed, maxTouchTime } from '../variables';
import useMethods from './useMethods';

// Edge bounce feedback
const rebound = (start: number, bound: number, callback: (spatial: number) => boolean) =>
  easeOutMove(
    start,
    bound,
    callback,
    defaultSpeed / 4,
    (t) => t,
    () => easeOutMove(bound, start, callback),
  );

/**
 * Physics-based scroll to a specific position
 */
export default function useScrollPosition<C extends (spatial: number) => boolean>(
  callbackX: C,
  callbackY: C,
  callbackS: C,
) {
  const callback = useMethods({
    X: (spatial: number) => callbackX(spatial),
    Y: (spatial: number) => callbackY(spatial),
    S: (spatial: number) => callbackS(spatial),
  });

  return (
    x: number,
    y: number,
    lastX: number,
    lastY: number,
    width: number,
    height: number,
    scale: number,
    safeScale: number,
    lastScale: number,
    rotate: number,
    touchedTime: number,
  ) => {
    const [currentWidth, currentHeight] = getRotateSize(rotate, width, height);
    // Edge state at start
    const [beginEdgeX, beginX] = computePositionEdge(x, safeScale, currentWidth, getViewportWidth());
    const [beginEdgeY, beginY] = computePositionEdge(y, safeScale, currentHeight, getViewportHeight());
    const moveTime = Date.now() - touchedTime;

    // Skip scroll logic and restore safe range if too much time elapsed or out of safe range
    if (moveTime >= maxTouchTime || safeScale !== scale || Math.abs(lastScale - scale) > 1) {
      // Calculate center scale point
      const { x: nextX, y: nextY } = getPositionOnMoveOrScale(x, y, width, height, scale, safeScale);
      const targetX = beginEdgeX ? beginX : nextX !== x ? nextX : null;
      const targetY = beginEdgeY ? beginY : nextY !== y ? nextY : null;

      if (targetX !== null) {
        easeOutMove(x, targetX, callback.X);
      }
      if (targetY !== null) {
        easeOutMove(y, targetY, callback.Y);
      }
      if (safeScale !== scale) {
        easeOutMove(scale, safeScale, callback.S);
      }
      return;
    }

    // Initial velocity
    const speedX = (x - lastX) / moveTime;
    const speedY = (y - lastY) / moveTime;
    const speedT = Math.sqrt(speedX ** 2 + speedY ** 2);
    // Whether edge is reached
    let edgeX = false;
    let edgeY = false;

    scrollMove(speedT, (spatial) => {
      const nextX = x + spatial * (speedX / speedT);
      const nextY = y + spatial * (speedY / speedT);

      const [isEdgeX, currentX] = computePositionEdge(nextX, scale, currentWidth, getViewportWidth());
      const [isEdgeY, currentY] = computePositionEdge(nextY, scale, currentHeight, getViewportHeight());

      if (isEdgeX && !edgeX) {
        edgeX = true;
        if (beginEdgeX) {
          easeOutMove(nextX, currentX, callback.X);
        } else {
          rebound(currentX, nextX + (nextX - currentX), callback.X);
        }
      }

      if (isEdgeY && !edgeY) {
        edgeY = true;
        if (beginEdgeY) {
          easeOutMove(nextY, currentY, callback.Y);
        } else {
          rebound(currentY, nextY + (nextY - currentY), callback.Y);
        }
      }
      // Stop scrolling if both edges are reached
      if (edgeX && edgeY) {
        return false;
      }

      const resultX = edgeX || callback.X(currentX);
      const resultY = edgeY || callback.Y(currentY);
      return resultX && resultY;
    });
  };
}

// Acceleration
const acceleration = -0.001;
// Resistance
const resistance = 0.0002;

/**
 * Scroll to a stop based on velocity
 */
function scrollMove(initialSpeed: number, callback: (spatial: number) => boolean) {
  let v = initialSpeed;
  let s = 0;
  let lastTime: number | undefined;
  let frameId = 0;

  const calcMove = (now: number) => {
    if (!lastTime) {
      lastTime = now;
    }
    const dt = now - lastTime;
    const direction = Math.sign(initialSpeed);
    const a = direction * acceleration;
    const f = Math.sign(-v) * v ** 2 * resistance;
    const ds = v * dt + ((a + f) * dt ** 2) / 2;
    v += (a + f) * dt;

    s += ds;
    // move to s
    lastTime = now;

    if (direction * v <= 0) {
      caf();
      return;
    }

    if (callback(s)) {
      raf();
      return;
    }
    caf();
  };
  raf();

  function raf() {
    frameId = requestAnimationFrame(calcMove);
  }
  function caf() {
    cancelAnimationFrame(frameId);
  }
}

/**
 * Easing function
 */
const easeOutQuart = (x: number) => 1 - (1 - x) ** 4;

/**
 * Eased move callback
 */
function easeOutMove(
  start: number,
  end: number,
  callback: (spatial: number) => boolean,
  speed = defaultSpeed,
  easing = easeOutQuart,
  complete?: () => void,
) {
  const distance = end - start;
  if (distance === 0) {
    return;
  }

  const startTime = Date.now();
  let frameId = 0;

  const calcMove = () => {
    const time = Math.min(1, (Date.now() - startTime) / speed);
    const result = callback(start + easing(time) * distance);

    if (result && time < 1) {
      raf();
      return;
    }
    cancelAnimationFrame(frameId);
    if (time >= 1 && complete) {
      complete();
    }
  };
  raf();

  function raf() {
    frameId = requestAnimationFrame(calcMove);
  }
}
