import { motion } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';

const services = [
  {
    id: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    title: 'Product Strategies',
    description: 'Strategic product roadmapping, codebase audits, performance tuning, and growth advice for digital products.',
    features: ['Product Roadmapping', 'UX & Conversion Audit', 'Core Web Vitals Tuning', 'Technical Growth Strategy'],
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'UI/UX Designing',
    description: 'Human-centered interfaces focused on clarity, user retention, smooth interactions, and multi-device accessibility.',
    features: ['Interface & Interaction Design', 'Design Systems', 'Interactive Prototypes', 'User Journey Mapping'],
  },
  {
    id: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Custom Development',
    description: 'Tailored software solutions, custom APIs, and backend architectures built from scratch to fit your exact business goals.',
    features: ['Custom SaaS Solutions', 'API & Microservices', 'Cloud Architecture', 'Database Design'],
  },
  {
    id: 4,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <path d="M13 14h4" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with React, Next.js, and resilient cloud architecture.',
    features: ['Custom Web Applications', 'Full-Stack Engineering', 'E-Commerce Platforms', 'Responsive Web Apps'],
  },
];

export default function Services() {
  return (
    <AnimatedSection id="services" labelledBy="services-title">
      <AnimatedItem>
        <div className="section-header">
          <span className="section-label">Our Capabilities</span>
          <h2 className="section-title" id="services-title">
            What we do <span className="accent-text">best.</span>
          </h2>
          <p className="section-subtitle">
            End-to-end web engineering and product design. We help you build right from day one.
          </p>
        </div>
      </AnimatedItem>

      <div className="services__grid">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="services__card card-dark"
            id={`service-card-${service.id}`}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
          >
            <motion.div className="services__card-icon-wrapper">
              {/* whileInView rather than animate: an infinite loop on `animate`
                  keeps compositing even when the section is far off screen. */}
              <motion.div
                className="services__card-icon"
                whileInView={{
                  y: [0, -4, 0],
                  rotate: [0, -5, 5, 0]
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                }}
              >
                {service.icon}
              </motion.div>
            </motion.div>
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-description">{service.description}</p>
            <ul className="services__card-features">
              {service.features.map((feature, featureIndex) => (
                <motion.li
                  key={feature}
                  className="services__card-feature"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 18,
                    delay: index * 0.1 + featureIndex * 0.06,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
            <a 
              href="#contact" 
              className="services__card-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              Discuss this project
            </a>

          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
