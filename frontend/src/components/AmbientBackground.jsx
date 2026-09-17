import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const orbs = [
  {
    id: 1,
    color: 'radial-gradient(circle, rgba(226, 232, 240, 0.06) 0%, rgba(226, 232, 240, 0.01) 45%, transparent 70%)',
    size: 700,
    initialX: '20%',
    initialY: '20%',
    duration: 24,
    xRange: [-40, 50, -20, 30, -40],
    yRange: [-30, 40, -40, 20, -30],
    scaleRange: [1, 1.08, 0.96, 1.04, 1],
  },
  {
    id: 2,
    color: 'radial-gradient(circle, rgba(148, 163, 184, 0.03) 0%, rgba(148, 163, 184, 0.005) 45%, transparent 70%)',
    size: 650,
    initialX: '75%',
    initialY: '60%',
    duration: 30,
    xRange: [30, -40, 30, -20, 30],
    yRange: [40, -30, 40, -20, 40],
    scaleRange: [1.05, 0.95, 1.08, 0.98, 1.05],
  },
];

function FloatingOrb({ orb, isMobile }) {
  const orbSize = isMobile ? Math.round(orb.size * 0.6) : orb.size;
  return (
    <motion.div
      style={{
        position: 'fixed',
        width: orbSize,
        height: orbSize,
        borderRadius: '50%',
        background: orb.color,
        left: orb.initialX,
        top: orb.initialY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        filter: 'blur(30px)',
      }}
      animate={{
        x: orb.xRange,
        y: orb.yRange,
        scale: orb.scaleRange,
      }}
      transition={{
        duration: orb.duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function AmbientBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/tablet on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* Both orbs render at every breakpoint; FloatingOrb scales them down on
     mobile. (This used to slice(0, 2) a 2-item array, a no-op left over
     from a 5-orb version.) */
  const visibleOrbs = orbs;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Drifting Ambient Gradient Orbs */}
      {visibleOrbs.map((orb) => (
        <FloatingOrb key={orb.id} orb={orb} isMobile={isMobile} />
      ))}


      {/* Subtle Noise / Grid Texture layer for depth */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `radial-gradient(var(--color-dot-grid, rgba(255, 255, 255, 0.04)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.8,
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        }}
      />
    </div>
  );
}

