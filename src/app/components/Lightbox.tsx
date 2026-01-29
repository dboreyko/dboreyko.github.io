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
        className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="lightbox-button absolute top-8 right-8 z-10 flex h-12 w-12 items-center justify-center border border-[var(--gray-400)] transition-colors duration-300 hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white"
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
            className="lightbox-button absolute left-8 flex h-12 w-12 items-center justify-center border border-[var(--gray-400)] transition-colors duration-300 hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white"
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
            className="lightbox-button absolute right-8 flex h-12 w-12 items-center justify-center border border-[var(--gray-400)] transition-colors duration-300 hover:border-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white"
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
            <p className="lightbox-caption">
              {images[currentIndex].caption}
            </p>
            <p className="lightbox-counter mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
