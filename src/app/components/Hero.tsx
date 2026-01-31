import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, FileText, Mail, X, Download } from 'lucide-react';

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToFlagship = () => {
    const flagship = document.getElementById('flagship-system');
    flagship?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contact = document.getElementById('contact-section');
    contact?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isResumeOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isResumeOpen]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="max-w-5xl w-full">
        <div className="border-l border-[var(--gray-900)] pl-8 md:pl-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hero-title mb-3"
          >
            Dimitry Boreyko
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="hero-subtitle mb-6"
          >
            Aerospace Engineering & Business Administration
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="hero-description mb-12 max-w-2xl"
          >
            Autonomous systems integration. Precision engineering. Designed for deployment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={scrollToFlagship}
              className="hero-action-primary group flex items-center gap-3 border border-[var(--gray-900)] px-8 py-4 hover:bg-[var(--gray-900)] hover:text-white transition-colors duration-300"
            >
              EXPLORE SYSTEMS
              <ChevronDown 
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" 
              />
            </button>

            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hero-action-secondary flex items-center gap-2 border border-[var(--gray-400)] px-6 py-4 hover:border-[var(--gray-900)] transition-colors duration-300"
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              RESUME
            </button>

            <button
              onClick={scrollToContact}
              className="hero-action-secondary flex items-center gap-2 border border-[var(--gray-400)] px-6 py-4 hover:border-[var(--gray-900)] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              CONTACT
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-white border border-[var(--gray-300)] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--gray-200)] px-6 py-4">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--gray-600)]">
                  <FileText className="w-4 h-4" />
                  Resume Preview
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/resume.pdf"
                    download="Dimitry_Boreyko_Resume.pdf"
                    className="hero-action-secondary flex items-center gap-2 border border-[var(--gray-400)] px-4 py-2 text-xs hover:border-[var(--gray-900)] transition-colors duration-300"
                  >
                    <Download className="w-4 h-4" />
                    DOWNLOAD PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(false)}
                    className="lightbox-button flex h-10 w-10 items-center justify-center border border-[var(--gray-400)] transition-colors duration-300 hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-[70vh] bg-[var(--gray-100)]">
                <object
                  data="/resume.pdf"
                  type="application/pdf"
                  className="h-full w-full"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center text-sm text-[var(--gray-600)]">
                    <p>PDF preview unavailable. Use the download button to access the resume.</p>
                    <a
                      href="/resume.pdf"
                      download="Dimitry_Boreyko_Resume.pdf"
                      className="hero-action-secondary flex items-center gap-2 border border-[var(--gray-400)] px-4 py-2 text-xs hover:border-[var(--gray-900)] transition-colors duration-300"
                    >
                      <Download className="w-4 h-4" />
                      DOWNLOAD PDF
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
