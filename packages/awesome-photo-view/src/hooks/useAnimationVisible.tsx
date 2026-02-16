import { useReducer, useRef } from 'react';
import type { ActiveAnimationType } from '../types';
import useForkedVariable from './useForkedVariable';

/**
 * Handle real visibility state with animation close
 * Implements leaveCallback via onAnimationEnd callback
 */
export default function useAnimationVisible(
  visible: boolean | undefined,
  afterClose?: () => void,
): [realVisible: boolean | undefined, activeAnimation: ActiveAnimationType, onAnimationEnd: () => void] {
  const [, handleRender] = useReducer((c) => !c, false);

  const activeAnimation = useRef<ActiveAnimationType>(0);

  // Visibility state fork
  const [realVisible, modifyRealVisible] = useForkedVariable(visible, (modify) => {
    // Visible: set enter animation
    if (visible) {
      modify(visible);
      activeAnimation.current = 1;
    } else {
      activeAnimation.current = 2;
    }
  });

  function onAnimationEnd() {
    // Trigger render after animation ends
    handleRender();
    // End animation: set hidden state
    if (activeAnimation.current === 2) {
      modifyRealVisible(false);
      // Trigger hide callback
      if (afterClose) {
        afterClose();
      }
    }
    // Reset state
    activeAnimation.current = 0;
  }

  return [
    /**
     * Real visibility state
     */
    realVisible,
    /**
     * Active animation in progress
     */
    activeAnimation.current,
    /**
     * Callback after animation ends
     */
    onAnimationEnd,
  ];
}
