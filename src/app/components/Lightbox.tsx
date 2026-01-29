import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  images: { src: string; caption: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(250, 250, 250, 0.98)' }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center border border-[var(--gray-400)] hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white transition-colors duration-300 z-10"
          style={{ fontSize: '0.75rem', fontWeight: 'var(--font-weight-medium)' }}
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-8 w-12 h-12 flex items-center justify-center border border-[var(--gray-400)] hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-8 w-12 h-12 flex items-center justify-center border border-[var(--gray-400)] hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}

        {/* Image Content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl max-h-[85vh] mx-auto px-20"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
            className="max-w-full max-h-[75vh] object-contain mx-auto border border-[var(--gray-300)]"
          />
          <div className="mt-6 text-center">
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {images[currentIndex].caption}
            </p>
            <p
              className="mt-2"
              style={{
                fontSize: '0.75rem',
                color: 'var(--gray-500)',
              }}
            >
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
