import { useRef, useMemo } from 'react';

/**
 * Forked variable handling
 * This hook does not trigger extra renders
 */
export default function useForkedVariable<T>(initial: T, updater: (modify: (variable: T) => void) => void) {
  // Initial forked variable
  const forkedRef = useRef(initial);

  function modify(next: T) {
    forkedRef.current = next;
  }

  useMemo(() => {
    // Sync internal forked variable after parameter changes
    updater(modify);
  }, [initial]);

  return [forkedRef.current, modify] as const;
}
