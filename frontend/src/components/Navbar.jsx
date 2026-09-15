import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  /* Below 768px the links live in an off-screen drawer. Off-screen is still
     focusable, so a closed drawer has to be marked inert or keyboard users
     tab through four invisible links. */
  const [isDrawer, setIsDrawer] = useState(false);
  const linksRef = useRef([]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsDrawer(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
      const contactSection = document.getElementById('contact');
      if (contactSection) sections.push(contactSection);

      const scrollPosition = window.scrollY + 150; // offset for navbar

      let currentActiveId = activeId;
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          currentActiveId = section.id;
        }
      }
      
      // If at bottom, contact might be active
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        currentActiveId = 'contact';
      }

      if (currentActiveId && (navLinks.some(link => link.id === currentActiveId) || currentActiveId === 'contact')) {
         setActiveId(currentActiveId);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.id === activeId);
    const activeEl = linksRef.current[activeIndex];
    
    const updateIndicator = () => {
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };
    
    updateIndicator();
    const timeout = setTimeout(updateIndicator, 50);
    
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeId]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
    >
      <div className="navbar__inner container">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="#home" className="navbar__logo" onClick={(e) => scrollToSection(e, 'home')}>
            <picture>
              <source srcSet="/logo1.png" media="(prefers-color-scheme: light)" />
              <img src="/logo.png" alt="JD Logo" className="navbar__logo-img" />
            </picture>
          </a>
        </motion.div>

        <div
          id="navbar-links"
          className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
          inert={isDrawer && !menuOpen}
        >
          {navLinks.map(({ id, label }, index) => {
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                ref={el => linksRef.current[index] = el}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={(e) => scrollToSection(e, id)}
              >
                {label}
              </a>
            );
          })}
          <motion.span
            aria-hidden="true"
            className="navbar__link-indicator"
            initial={false}
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {/* The desktop CTA lives in .navbar__right, which is hidden below
              768px. Without this the drawer offers no route to the form. */}
          <a
            href="#contact"
            className="btn btn-primary navbar__drawer-cta"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Get in Touch
          </a>
        </div>

        <div className="navbar__right">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <a
              href="#contact"
              className="btn btn-outline navbar__cta"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <button
          type="button"
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
          id="nav-hamburger"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

