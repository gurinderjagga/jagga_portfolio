import { motion } from 'motion/react';

const heroTitleLine1 = "Your Vision. Our Code.";
const heroTitleLine2 = "Measurable Results.";

/* What we do, stated plainly under the headline so the first screen answers
   "what is this site" without a scroll. Mirrors the Services section. */
const disciplines = [
  { id: 'services', n: '01', label: 'Product strategy' },
  { id: 'services', n: '02', label: 'UI/UX design' },
  { id: 'services', n: '03', label: 'Custom development' },
  { id: 'services', n: '04', label: 'Web development' },
];

const goTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__content container">
        <motion.div
          className="hero__card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.15 }}
        >
          <p className="hero__eyebrow">Web engineering and product design studio</p>

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
              className="hero__title-line hero__title-line--accent"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.35 }}
            >
              {heroTitleLine2}
            </motion.span>
          </h1>

          <motion.div
            className="hero__lower"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.5 }}
          >
            <p className="hero__subtitle">
              We bring human insight and intelligent systems together, so you
              don't simply outperform the market. You outcreate it.
            </p>
            <div className="hero__actions">
              <a href="#work" className="btn btn-primary" onClick={(e) => goTo(e, 'work')}>
                View selected work
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-outline" onClick={(e) => goTo(e, 'contact')}>
                Get in touch
              </a>
            </div>
          </motion.div>

          <ul className="hero__index" aria-label="What we do">
            {disciplines.map((d) => (
              <li key={d.n}>
                <a href="#services" className="hero__index-item" onClick={(e) => goTo(e, d.id)}>
                  <span className="hero__index-n">{d.n}</span>
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
