import { motion } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';

const services = [
  {
    id: 1,
    title: 'Product strategy',
    description: 'Roadmapping, codebase audits, performance tuning, and growth advice for digital products.',
    features: ['Product roadmapping', 'UX and conversion audit', 'Core Web Vitals tuning', 'Technical growth strategy'],
  },
  {
    id: 2,
    title: 'UI/UX design',
    description: 'Interfaces built around clarity, retention, smooth interaction, and access on every device.',
    features: ['Interface and interaction design', 'Design systems', 'Interactive prototypes', 'User journey mapping'],
  },
  {
    id: 3,
    title: 'Custom development',
    description: 'Software, APIs, and backends built from scratch to fit your exact business goals.',
    features: ['Custom SaaS solutions', 'API and microservices', 'Cloud architecture', 'Database design'],
  },
  {
    id: 4,
    title: 'Web development',
    description: 'Responsive websites and web applications on React, Next.js, and resilient cloud infrastructure.',
    features: ['Custom web applications', 'Full-stack engineering', 'E-commerce platforms', 'Responsive web apps'],
  },
];

const goToContact = (e) => {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

export default function Services() {
  return (
    <AnimatedSection id="services" labelledBy="services-title">
      <AnimatedItem>
        <div className="section-header">
          <span className="section-label">Our capabilities</span>
          <h2 className="section-title" id="services-title">
            What we do <span className="accent-text">best.</span>
          </h2>
          <p className="section-subtitle">
            End-to-end web engineering and product design. We help you build right from day one.
          </p>
        </div>
      </AnimatedItem>

      {/* Ruled rows, not cards: four parallel offerings read faster as a list
          than as four boxes, and every detail stays visible without hover. */}
      <ol className="services__list">
        {services.map((service, index) => (
          <motion.li
            key={service.id}
            className="services__row"
            id={`service-card-${service.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: index * 0.06 }}
          >
            <span className="services__n" aria-hidden="true">0{service.id}</span>
            <div className="services__main">
              <h3 className="services__title">{service.title}</h3>
              <p className="services__description">{service.description}</p>
            </div>
            <ul className="services__features">
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href="#contact" className="services__link" onClick={goToContact}>
              Discuss this project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.li>
        ))}
      </ol>
    </AnimatedSection>
  );
}
