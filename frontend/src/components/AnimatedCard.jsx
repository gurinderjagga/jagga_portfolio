import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * AnimatedCard — interactive card with 3D perspective tilt on hover.
 * Uses useMotionValue outside the React render cycle for smooth 60fps animation.
 */
export default function AnimatedCard({
  children,
  className = '',
  enableTilt = true,
  id,
  onClick,
  tabIndex,
}) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      onClick={onClick}
      /* Motion adds tabindex="0" to anything with a tap handler. Pass -1 when
         a real control inside the card owns keyboard access, so the card
         itself does not become an empty stop in the tab order. */
      tabIndex={tabIndex}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 800,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
