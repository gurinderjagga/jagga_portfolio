import { motion } from 'motion/react';

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 0.6,
    },
  },
};

/**
 * AnimatedSection: replaces SectionWrapper with motion-powered viewport reveals.
 * Children wrapped in <AnimatedItem> will stagger in automatically.
 */
export default function AnimatedSection({
  children,
  id,
  className = '',
  labelledBy,
  ariaLabel,
}) {
  return (
    <motion.section
      id={id}
      className={`section-padding ${className}`}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : ariaLabel}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}

/**
 * AnimatedItem: a child wrapper that participates in the parent's stagger.
 * Use inside AnimatedSection for automatic orchestration.
 */
export function AnimatedItem({ children, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component className={className} variants={childVariants}>
      {children}
    </Component>
  );
}
