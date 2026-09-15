import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="container">
        <div className="footer__top">
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <p style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
              Jagga Digital
            </p>
            <p className="footer__tagline">
              Crafting digital experiences that convert. Strategy. Design. Code.
            </p>
          </motion.div>




          <motion.div
            className="footer__links-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
          >
            <h2 className="footer__heading">Connect</h2>
            <div className="footer__socials">
              {[
                {
                  href: 'https://x.com/jaggadigital',
                  label: 'Twitter',
                  id: 'social-twitter',
                  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                },
                {
                  href: 'https://linkedin.com',
                  label: 'LinkedIn',
                  id: 'social-linkedin',
                  icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
                },
              ].map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={social.label}
                  id={social.id}
                  whileHover={{
                    scale: 1.25,
                    y: -3,
                    transition: { type: 'spring', stiffness: 400, damping: 15 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Jagga Digital. All rights reserved.
          </p>
          <motion.button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            id="back-to-top"
            whileHover={{
              scale: 1.1,
              y: -3,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}
