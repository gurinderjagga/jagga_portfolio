import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * MagneticButton: a CTA that subtly pulls toward the cursor on hover.
 * Animation runs entirely outside the React render cycle via useMotionValue.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type,
  disabled,
  id,
  strength = 0.35,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  // Inner content moves slightly more than the outer shell for kinetic tension
  const innerX = useTransform(springX, (v) => v * 1.3);
  const innerY = useTransform(springY, (v) => v * 1.3);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      type={type}
      disabled={disabled}
      id={id}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      <motion.span
        style={{ x: innerX, y: innerY, display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
