import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import './App.css';

export default function App() {
  return (
    /* reducedMotion="user" makes every motion component honour the OS
       "reduce motion" setting — the CSS media query alone cannot reach them. */
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <AmbientBackground />
      <header>
        <Navbar />
      </header>
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

