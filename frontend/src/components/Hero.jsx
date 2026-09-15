import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, animate } from 'motion/react';
import MagneticButton from './MagneticButton';

/* Animated counter that counts up from 0 to the target value */
function CountUp({ target, suffix = '' }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const numericTarget = parseFloat(target);
    const controls = animate(0, numericTarget, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate(value) {
        node.textContent = (Number.isInteger(numericTarget)
          ? Math.round(value)
          : value.toFixed(0)) + suffix;
      },
    });

    return () => controls.stop();
  }, [target, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

const heroTitleLine1 = "Your Vision. Our Code.";
const heroTitleLine2 = "Measurable Results.";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [statsVisible, setStatsVisible] = useState(false);

  const handleNavigate = (path) => {
    const id = path.substring(1); // remove '/'
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero__particles">
        <motion.div className="hero__particle hero__particle--1" style={{ y: particle1Y }} />
      </div>

      <div className="hero__content container">
        {/* Main hero card */}
        <motion.div
          className="hero__card"
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.15 }}
        >
          <div className="hero__card-bg">
            <div className="hero__card-overlay" />
          </div>
          <div className="hero__card-content">
            <h1 className="hero__title" id="hero-title">
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.25 }}
              >
                {heroTitleLine1}
              </motion.span>
              <br />
              <motion.span
                className="accent-text hero__title-line"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.35 }}
              >
                {heroTitleLine2}
              </motion.span>
            </h1>
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.45 }}
            >
              We bring human insights and intelligent systems together.
              So that you don't simply outperform the market, you Outcreate it.
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.55 }}
            >
              <MagneticButton
                className="btn btn-primary"
                onClick={() => handleNavigate('/work')}
              >
                View Selected Work
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </MagneticButton>
              <MagneticButton
                className="btn btn-outline"
                onClick={() => handleNavigate('/contact')}
              >
                Get in Touch
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.7 }}
          onViewportEnter={() => setStatsVisible(true)}
          viewport={{ once: true }}
        >
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={30} suffix="+" /> : '0+'}
            </span>
            <span className="hero__stat-label">Projects Launched</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={98} suffix="%" /> : '0%'}
            </span>
            <span className="hero__stat-label">Client Satisfaction</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={100} suffix="%" /> : '0%'}
            </span>
            <span className="hero__stat-label">On-Time Delivery</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
