import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Minus, ArrowDown } from 'lucide-react';
import { SystemDiagram } from './SystemDiagram';

type Phase = 'sensing' | 'stabilization' | 'navigation' | 'integration';
type ViewState = 'collapsed' | Phase;

const phases = [
  {
    id: 'sensing' as Phase,
    number: '01',
    label: 'Vision Brain',
    title: 'Vision Brain',
    description: 'Raspberry Pi 5 with AI HAT performing human detection only. Camera input with bounding box output displayed on laptop screen. No gimbal, motors, or drone at this stage.',
  },
  {
    id: 'stabilization' as Phase,
    number: '02',
    label: 'Active Eye',
    title: 'Active Eye',
    description: 'Two-axis gimbal with servos driven by Pi using error vector from vision system. LiDAR sensor mounted to and following gimbal for distance measurement.',
  },
  {
    id: 'navigation' as Phase,
    number: '03',
    label: 'Aerial Platform',
    title: 'Aerial Platform',
    description: 'Autonomous flight handled solely by Cube Orange+ with GPS and onboard sensors. Independent flight operations with no Pi control.',
  },
  {
    id: 'integration' as Phase,
    number: '04',
    label: 'System Integration',
    title: 'System Integration',
    description: 'Raspberry Pi connects to Cube via MAVLink, sending guided velocity and position commands based on vision tracking and LiDAR distance measurements.',
  },
];

export function FlagshipSystem() {
  const [viewState, setViewState] = useState<ViewState>('collapsed');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isExpanded = viewState !== 'collapsed';
  const activePhase = isExpanded ? viewState : null;

  // Handle wheel events when expanded to navigate between stages
  useEffect(() => {
    if (!isExpanded || !contentRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const currentIndex = phases.findIndex(p => p.id === viewState);
      if (currentIndex === -1) return;

      if (e.deltaY > 0 && currentIndex < phases.length - 1) {
        // Scroll down - next stage
        setViewState(phases[currentIndex + 1].id);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous stage
        setViewState(phases[currentIndex - 1].id);
      }
    };

    const element = contentRef.current;
    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [isExpanded, viewState]);

  const handleExpand = () => {
    setViewState('sensing');
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCollapse = () => {
    setViewState('collapsed');
  };

  const handleCollapseAndScrollToAbout = () => {
    setViewState('collapsed');
    setTimeout(() => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhaseClick = (phaseId: Phase) => {
    setViewState(phaseId);
  };

  // Expose expand function globally for deep-linking
  useEffect(() => {
    (window as any).expandFlagshipSystem = (phaseId?: Phase) => {
      if (phaseId) {
        setViewState(phaseId);
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        handleExpand();
      }
    };
    
    return () => {
      delete (window as any).expandFlagshipSystem;
    };
  }, []);

  const currentPhaseData = activePhase ? phases.find(p => p.id === activePhase) : null;

  return (
    <section
      id="flagship-system"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 transition-colors duration-500 relative"
      style={{
        backgroundColor: isExpanded ? 'var(--bg-lab)' : 'var(--bg-museum)',
        minHeight: isExpanded ? '100vh' : 'auto',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="px-3 py-1 border uppercase tracking-wider"
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 'var(--font-weight-medium)',
                    borderColor: isExpanded ? 'var(--accent-steel)' : 'var(--gray-400)',
                    color: isExpanded ? 'var(--accent-steel)' : 'var(--gray-600)',
                  }}
                >
                  In Development
                </span>
                <span
                  className="uppercase tracking-wider"
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 'var(--font-weight-medium)',
                    color: isExpanded ? 'var(--gray-500)' : 'var(--gray-600)',
                  }}
                >
                  Flagship System
                </span>
              </div>
              
              <h2
                className="mb-4"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  color: isExpanded ? 'var(--gray-100)' : 'var(--gray-900)',
                }}
              >
                GPS Human-Follow Quadcopter
              </h2>
              
              <p
                className="max-w-2xl"
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: isExpanded ? 'var(--gray-400)' : 'var(--gray-600)',
                }}
              >
                AI Tracking + GPS Autonomy
              </p>
            </div>
            
            <button
              onClick={isExpanded ? handleCollapse : handleExpand}
              className="flex items-center gap-2 px-6 py-3 border transition-all duration-300 hover:bg-opacity-10"
              style={{
                fontSize: '0.75rem',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: '0.05em',
                borderColor: isExpanded ? 'var(--accent-steel)' : 'var(--gray-400)',
                color: isExpanded ? 'var(--accent-steel)' : 'var(--gray-700)',
                backgroundColor: isExpanded ? 'rgba(91, 143, 163, 0.1)' : 'transparent',
              }}
            >
              {isExpanded ? (
                <>
                  <Minus className="w-4 h-4" />
                  COLLAPSE
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  EXPAND
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Fixed-height content container with spine navigator */}
        <div
          className="relative overflow-hidden transition-all duration-500"
          style={{
            height: isExpanded ? '70vh' : '0',
            minHeight: isExpanded ? '600px' : '0',
          }}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex gap-8"
              >
                {/* Vertical Spine Navigator */}
                <div className="flex-shrink-0 pt-2">
                  <div className="flex flex-col gap-6">
                    {phases.map((phase) => (
                      <button
                        key={phase.id}
                        onClick={() => handlePhaseClick(phase.id)}
                        className="group relative flex items-center gap-4"
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        {/* Tick mark and vertical line */}
                        <div className="relative flex items-center">
                          <div
                            className="w-12 h-px transition-all duration-200"
                            style={{
                              backgroundColor: activePhase === phase.id ? 'var(--accent-steel)' : 'var(--gray-700)',
                              opacity: activePhase === phase.id ? 1 : 0.4,
                            }}
                          />
                          <div
                            className="w-2 h-2 rounded-full border-2 transition-all duration-200"
                            style={{
                              borderColor: activePhase === phase.id ? 'var(--accent-steel)' : 'var(--gray-700)',
                              backgroundColor: activePhase === phase.id ? 'var(--accent-steel)' : 'transparent',
                            }}
                          />
                        </div>
                        
                        {/* Phase number - always visible */}
                        <span
                          className="font-mono transition-all duration-200"
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 'var(--font-weight-medium)',
                            color: activePhase === phase.id ? 'var(--accent-steel)' : 'var(--gray-600)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {phase.number}
                        </span>

                        {/* Phase label - hover only */}
                        <span
                          className="absolute left-20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--gray-400)',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {phase.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col min-w-0" ref={contentRef}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={viewState}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Phase Title and Description */}
                      {currentPhaseData && (
                        <div className="mb-8">
                          <div className="border-l-2 pl-6" style={{ borderColor: 'var(--accent-steel)' }}>
                            <div className="flex items-baseline gap-4 mb-2">
                              <h3
                                style={{
                                  fontSize: '1.5rem',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: 'var(--gray-200)',
                                  letterSpacing: '-0.01em',
                                }}
                              >
                                {currentPhaseData.title}
                              </h3>
                            </div>
                            <p
                              style={{
                                fontSize: '0.9375rem',
                                lineHeight: '1.7',
                                color: 'var(--gray-400)',
                              }}
                            >
                              {currentPhaseData.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* System Diagram */}
                      <div className="flex-1 flex items-center justify-center">
                        <SystemDiagram phase={activePhase as Phase} />
                      </div>

                      {/* Terminal Actions - Only visible in Phase 4 */}
                      {activePhase === 'integration' && (
                        <div
                          className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6"
                          style={{ borderColor: 'var(--gray-800)' }}
                        >
                          <button
                            onClick={handleCollapseAndScrollToAbout}
                            className="flex items-center justify-center gap-2 px-8 py-4 border transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 'var(--font-weight-medium)',
                              letterSpacing: '0.05em',
                              borderColor: 'var(--gray-700)',
                              color: 'var(--gray-400)',
                            }}
                          >
                            <Minus className="w-4 h-4" />
                            COLLAPSE SYSTEM
                          </button>

                          <button
                            onClick={scrollToAbout}
                            className="flex items-center justify-center gap-2 px-8 py-4 border transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 'var(--font-weight-medium)',
                              letterSpacing: '0.05em',
                              borderColor: 'var(--accent-steel)',
                              color: 'var(--accent-steel)',
                            }}
                          >
                            CONTINUE TO ABOUT
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Technical Summary - Only visible in non-terminal phases */}
                      {activePhase !== 'integration' && (
                        <div
                          className="mt-8 pt-8 border-t"
                          style={{ borderColor: 'var(--gray-800)' }}
                        >
                          <p
                            className="max-w-3xl"
                            style={{
                              fontSize: '0.875rem',
                              lineHeight: '1.8',
                              color: 'var(--gray-500)',
                              fontStyle: 'italic',
                            }}
                          >
                            Use spine navigator to explore each subsystem. Experimental platform designed for 
                            eventual real-world deployment with scalable architecture for higher-power aerial platforms.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}