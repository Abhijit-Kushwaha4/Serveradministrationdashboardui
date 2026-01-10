
import { useMemo } from 'react';

// Standardized "Spring Physics" configuration for a snappy, organic feel.
const spring = {
  type: "spring",
  stiffness: 400, // Determines the "bounciness" of the spring.
  damping: 30,    // Controls the "friction" or resistance.
};

/**
 * A reusable hook to provide standardized animation properties for Framer Motion.
 * This ensures a consistent look and feel across the entire application.
 */
export const useSmoothAnimation = () => {
  const animationProps = useMemo(() => ({
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: spring,
  }), []);

  return animationProps;
};

// We can also export the spring config directly if needed elsewhere.
export { spring };
