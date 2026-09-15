import { useState } from 'react';
import { motion } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import AnimatedCard from './AnimatedCard';
import ProjectModal from './ProjectModal';
/* Responsive variants sit beside the sources as <stem>-<width>.<ext>.
   The glob is scoped to that "-<digits>" suffix so the oversized originals
   are never pulled into the bundle. */
const assets = import.meta.glob('../assets/images/*-[0-9]*.{avif,webp,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const assetUrl = (name) => assets[`../assets/images/${name}`];

const srcSet = (stem, ext, widths) =>
  widths.map((w) => `${assetUrl(`${stem}-${w}.${ext}`)} ${w}w`).join(', ');

const projects = [
  {
    id: 1,
    title: 'Phoenix — Car Commerce Platform',
    category: 'Full Stack Development',
    image: {
      stem: 'ss2-opt',
      widths: [480, 720, 960, 1091],
      fallback: 1091,
      width: 1091,
      height: 951,
      sizes: '(min-width: 1367px) 758px, (min-width: 1248px) 1152px, calc(100vw - 48px)',
    },
    result: 'Live Project',
    description: 'A full-stack car commerce web application. Browse, list, and purchase vehicles with a seamless, modern buying experience.',
    approach: 'Built end-to-end with a robust backend, real-time listings, and a clean responsive frontend optimized for conversion.',
    url: 'https://phoenix-co.vercel.app',
  },
  {
    id: 2,
    title: 'Personal Trainer Website',
    category: 'Web Development',
    image: {
      stem: 'ss3-opt',
      widths: [480, 720, 960, 1440],
      fallback: 1440,
      width: 1440,
      height: 719,
      sizes: '(min-width: 1367px) 366px, (min-width: 1248px) 1152px, calc(100vw - 48px)',
    },
    result: 'Live Project',
    description: 'A modern, high-conversion website for a personal trainer. Showcases services, testimonials, and contact options clearly.',
    approach: 'Designed with a focus on conversion optimization, fast loading times, and a responsive layout for mobile users.',
    url: 'https://areterex-fitness.vercel.app/',
  },
  {
    id: 3,
    title: 'Yuvraj Rawat — Video Editor Portfolio',
    category: 'Full Stack Development',
    image: {
      stem: 'ss-opt',
      widths: [480, 720, 960, 1440],
      fallback: 1440,
      width: 1440,
      height: 707,
      sizes: '(min-width: 1367px) 575px, (min-width: 1248px) 1152px, calc(100vw - 48px)',
    },
    result: 'Live Project',
    description: 'A cinematic, high-performance video editor portfolio site built with modern web technologies. Showcases reel work with smooth transitions and immersive design.',
    approach: 'Designed from scratch with a film-noir aesthetic, motion-first interactions, and mobile-first responsive layout.',
    url: 'https://yuvraj-rawat.netlify.app',
  },
];

export default function Work() {
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
          {/* No AnimatePresence or layout prop here: the list is static, so
              nothing ever enters or exits. Both were left over from a
              removed filter UI and cost layout measurement per render. */}
          {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
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
                  <div className="work__card-image">
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={srcSet(project.image.stem, 'avif', project.image.widths)}
                        sizes={project.image.sizes}
                      />
                      <source
                        type="image/webp"
                        srcSet={srcSet(project.image.stem, 'webp', project.image.widths)}
                        sizes={project.image.sizes}
                      />
                      <img
                        src={assetUrl(`${project.image.stem}-${project.image.fallback}.jpg`)}
                        alt={project.title}
                        width={project.image.width}
                        height={project.image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
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
