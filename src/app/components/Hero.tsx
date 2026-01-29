import { motion } from 'motion/react';
import { ChevronDown, FileText, Mail } from 'lucide-react';

export function Hero() {
  const scrollToFlagship = () => {
    const flagship = document.getElementById('flagship-system');
    flagship?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contact = document.getElementById('contact-section');
    contact?.scrollIntoView({ behavior: 'smooth' });
  };

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
            className="font-[var(--font-weight-bold)] tracking-tight mb-3"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Dimitry Boreyko
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mb-6 tracking-wide uppercase"
            style={{ 
              fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
              color: 'var(--gray-600)',
              letterSpacing: '0.15em',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Aerospace Engineering & Business Administration
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mb-12 max-w-2xl"
            style={{ 
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: '1.6',
              color: 'var(--gray-700)',
              fontWeight: 'var(--font-weight-normal)'
            }}
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
              className="group flex items-center gap-3 border border-[var(--gray-900)] px-8 py-4 hover:bg-[var(--gray-900)] hover:text-white transition-colors duration-300"
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              EXPLORE SYSTEMS
              <ChevronDown 
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" 
              />
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[var(--gray-400)] px-6 py-4 hover:border-[var(--gray-900)] transition-colors duration-300"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--gray-600)',
              }}
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              RESUME
            </a>

            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 border border-[var(--gray-400)] px-6 py-4 hover:border-[var(--gray-900)] transition-colors duration-300"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--gray-600)',
              }}
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              CONTACT
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}