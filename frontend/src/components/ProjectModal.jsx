import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* Deliberately excludes the preview iframe. Focus that enters a cross-origin
   frame is gone — our Escape listener never sees the keypress and the dialog
   becomes a real keyboard trap. The frame is a preview, not part of the
   page's keyboard flow. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);

  /* While open: lock scroll, close on Escape, keep Tab inside the dialog,
     and hand focus back to whatever opened it on the way out. */
  useEffect(() => {
    if (!project) return; // do nothing when modal is closed

    const previouslyFocused = document.activeElement;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Wrap at both ends so focus never escapes to the page behind
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    // Land on the panel itself so the dialog's label is announced first
    const focusTimer = requestAnimationFrame(() => panelRef.current?.focus());

    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="project-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="project-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${project.title}`}
          >
            {/* Header bar */}
            <div className="project-modal__header">
              <div className="project-modal__meta">
                <span className="project-modal__tag">{project.category}</span>
                <h3 className="project-modal__title">{project.title}</h3>
              </div>
              <div className="project-modal__actions">
                <button
                  type="button"
                  className="project-modal__close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* iFrame */}
            <div className="project-modal__frame-wrap">
              <iframe
                src={project.url}
                title={project.title}
                className="project-modal__iframe"
                tabIndex={-1}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
