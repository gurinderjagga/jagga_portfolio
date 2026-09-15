import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import AnimatedCard from './AnimatedCard';
import ProjectModal from './ProjectModal';
import trainerWebsite from '../assets/images/ss3-opt.jpg';
import yuvrajPortfolio from '../assets/images/ss-opt.jpg';
import phoenixProject from '../assets/images/ss2-opt.jpg';

const projects = [
  {
    id: 1,
    title: 'Phoenix — Car Commerce Platform',
    category: 'Full Stack Development',
    image: phoenixProject,
    result: 'Live Project',
    description: 'A full-stack car commerce web application. Browse, list, and purchase vehicles with a seamless, modern buying experience.',
    approach: 'Built end-to-end with a robust backend, real-time listings, and a clean responsive frontend optimized for conversion.',
    url: 'https://phoenix-co.vercel.app',
  },
  {
    id: 2,
    title: 'Personal Trainer Website',
    category: 'Web Development',
    image: trainerWebsite,
    result: 'Live Project',
    description: 'A modern, high-conversion website for a personal trainer. Showcases services, testimonials, and contact options clearly.',
    approach: 'Designed with a focus on conversion optimization, fast loading times, and a responsive layout for mobile users.',
    url: 'https://areterex-fitness.vercel.app/',
  },
  {
    id: 3,
    title: 'Yuvraj Rawat — Video Editor Portfolio',
    category: 'Full Stack Development',
    image: yuvrajPortfolio,
    result: 'Live Project',
    description: 'A cinematic, high-performance video editor portfolio site built with modern web technologies. Showcases reel work with smooth transitions and immersive design.',
    approach: 'Designed from scratch with a film-noir aesthetic, motion-first interactions, and mobile-first responsive layout.',
    url: 'https://yuvraj-rawat.netlify.app',
  },
];

export default function Work() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <AnimatedSection id="work" labelledBy="work-title">
        <AnimatedItem>
          <div className="section-header">
            <span className="section-label">Featured Work</span>
            <h2 className="section-title" id="work-title">
              Built with <span className="accent-text">purpose & speed.</span>
            </h2>
            <p className="section-subtitle">
              A selection of digital products we've conceptualized, designed, and launched.
              Click on any project to explore a live preview.
            </p>
          </div>
        </AnimatedItem>

        {/* Project cards grid */}
        <div className="work__grid">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  delay: index * 0.08,
                }}
              >
                <AnimatedCard
                  className={`work__card card-dark${project.url ? ' work__card--clickable' : ''}`}
                  id={`project-card-${project.id}`}
                  onClick={() => project.url && setActiveModal(project)}
                  /* Keyboard access lives on the Preview button below. */
                  tabIndex={-1}
                >
                  <div
                    className="work__card-image"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                    <motion.div
                      className="work__card-overlay"
                      initial={false}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="work__card-approach">
                        <strong>The Approach:</strong> {project.approach}
                      </p>
                    </motion.div>
                  </div>
                  <div className="work__card-content">
                    <h3 className="work__card-title">{project.title}</h3>
                    <p className="work__card-description">{project.description}</p>
                    <div className="work__card-footer">
                      <span className="work__card-result">{project.result}</span>
                      {project.url && (
                        <button
                          type="button"
                          className="work__card-hint"
                          aria-label={`Preview site: ${project.title}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModal(project);
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 9l6 6" />
                            <path d="M15 9v6H9" />
                          </svg>
                          Preview site
                        </button>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Iframe Preview Modal */}
      <ProjectModal
        project={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
