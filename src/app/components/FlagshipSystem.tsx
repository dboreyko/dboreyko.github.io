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
  const [viewMode, setViewMode] = useState<'stepped' | 'continuous'>('stepped');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wheelLockRef = useRef(false);

  const isExpanded = viewState !== 'collapsed';
  const activePhase = isExpanded ? viewState : null;
  const isStepped = viewMode === 'stepped';

  // Handle wheel events when expanded to navigate between stages
  useEffect(() => {
    if (!isExpanded || !contentRef.current || !isStepped) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (wheelLockRef.current || Math.abs(e.deltaY) < 10) return;
      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 550);
      
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
  }, [isExpanded, isStepped, viewState]);

  useEffect(() => {
    if (!isExpanded || !contentRef.current || isStepped) return;

    const handleWheel = (e: WheelEvent) => {
      const currentIndex = phases.findIndex(p => p.id === viewState);
      if (currentIndex === -1) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const isAtFirst = currentIndex === 0;
      const isAtLast = currentIndex === phases.length - 1;

      if ((isScrollingDown && isAtLast) || (isScrollingUp && isAtFirst)) {
        return;
      }

      e.preventDefault();

      if (wheelLockRef.current || Math.abs(e.deltaY) < 10) return;
      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 550);

      if (isScrollingDown && currentIndex < phases.length - 1) {
        const nextPhase = phases[currentIndex + 1];
        phaseRefs.current[currentIndex + 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setViewState(nextPhase.id);
      } else if (isScrollingUp && currentIndex > 0) {
        const prevPhase = phases[currentIndex - 1];
        phaseRefs.current[currentIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setViewState(prevPhase.id);
      }
    };

    const element = contentRef.current;
    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [isExpanded, isStepped, viewState]);

  useEffect(() => {
    if (!isExpanded || !contentRef.current || isStepped) return;

    const container = contentRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visible[0];
        const phaseId = topEntry?.target.getAttribute('data-phase') as Phase | null;
        if (phaseId && phaseId !== viewState) {
          setViewState(phaseId);
        }
      },
      {
        root: container,
        threshold: [0.3, 0.6, 0.9],
      }
    );

    phaseRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isExpanded, isStepped, viewState]);

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
    if (!isStepped) {
      const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);
      const target = phaseRefs.current[phaseIndex];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleModeChange = (mode: 'stepped' | 'continuous') => {
    setViewMode(mode);
    if (mode === 'continuous') {
      setViewState('sensing');
      requestAnimationFrame(() => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
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
      className={`flagship-section py-24 px-6 md:px-12 transition-colors duration-500 relative ${isExpanded ? 'flagship-section--expanded' : ''}`}
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
                  className="flagship-badge px-3 py-1 border uppercase tracking-wider"
                >
                  In Development
                </span>
                <span
                  className="flagship-kicker uppercase tracking-wider"
                >
                  Flagship System
                </span>
              </div>
              
              <h2
                className="flagship-title mb-4"
              >
                GPS Human-Follow Quadcopter
              </h2>
              
              <p
                className="flagship-subtitle max-w-2xl"
              >
                AI Tracking + GPS Autonomy
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flagship-mode-toggle flex items-center border">
                <button
                  type="button"
                  onClick={() => handleModeChange('stepped')}
                  className={`flagship-mode-button ${isStepped ? 'is-active' : ''}`}
                >
                  Steps
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('continuous')}
                  className={`flagship-mode-button ${!isStepped ? 'is-active' : ''}`}
                >
                  Scroll
                </button>
              </div>
              <button
                onClick={isExpanded ? handleCollapse : handleExpand}
                className={`flagship-toggle flex items-center gap-2 px-6 py-3 border transition-all duration-300 hover:bg-opacity-10 ${isExpanded ? 'flagship-toggle--expanded' : ''}`}
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
          </div>
        </motion.div>

        {/* Fixed-height content container with spine navigator */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ${isExpanded ? 'h-[70vh] min-h-[600px]' : 'h-0 min-h-0'}`}
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
                        className={`flagship-phase-button group ${activePhase === phase.id ? 'is-active' : ''}`}
                      >
                        {/* Tick mark and vertical line */}
                        <div className="relative flex items-center">
                          <div
                            className="flagship-phase-line"
                          />
                          <div
                            className="flagship-phase-dot"
                          />
                        </div>
                        
                        {/* Phase number - always visible */}
                        <span
                          className="flagship-phase-number"
                        >
                          {phase.number}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div
                  className={`flex-1 flex flex-col min-w-0 ${isStepped ? '' : 'overflow-y-auto pr-4'}`}
                  ref={contentRef}
                >
                  {isStepped ? (
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
                          <div className="mb-6">
                            <div className="border-l-2 border-[var(--accent-steel)] pl-6">
                              <div className="flex items-baseline gap-4 mb-2">
                                <h3 className="flagship-phase-title">
                                  {currentPhaseData.title}
                                </h3>
                              </div>
                              <p className="flagship-phase-description">
                                {currentPhaseData.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Terminal Actions - Only visible in Phase 4 */}
                        {activePhase === 'integration' && (
                          <div
                            className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
                          >
                            <button
                              onClick={handleCollapseAndScrollToAbout}
                              className="flagship-terminal-action flagship-terminal-action-muted flex items-center justify-center gap-2 border px-8 py-4 transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                            >
                              <Minus className="w-4 h-4" />
                              COLLAPSE SYSTEM
                            </button>

                            <button
                              onClick={scrollToAbout}
                              className="flagship-terminal-action flagship-terminal-action-primary flex items-center justify-center gap-2 border px-8 py-4 transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                            >
                              CONTINUE TO ABOUT
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* System Diagram */}
                        <div className="flex-1 flex items-center justify-center">
                          <SystemDiagram phase={activePhase as Phase} />
                        </div>

                        {/* Technical Summary - Only visible in non-terminal phases */}
                        {activePhase !== 'integration' && (
                          <div
                            className="mt-8 pt-8 border-t border-[var(--gray-800)]"
                          >
                            <p className="flagship-summary max-w-3xl">
                              Use spine navigator to explore each subsystem. Experimental platform designed for 
                              eventual real-world deployment with scalable architecture for higher-power aerial platforms.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="flex flex-col gap-16">
                      {phases.map((phase, index) => (
                        <div
                          key={phase.id}
                          ref={(el) => {
                            phaseRefs.current[index] = el;
                          }}
                          data-phase={phase.id}
                          className="flex flex-col gap-6"
                        >
                          <div className="border-l-2 border-[var(--accent-steel)] pl-6">
                            <div className="flex items-baseline gap-4 mb-2">
                              <h3 className="flagship-phase-title">
                                {phase.title}
                              </h3>
                            </div>
                            <p className="flagship-phase-description">
                              {phase.description}
                            </p>
                          </div>

                          {phase.id === 'integration' && (
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                              <button
                                onClick={handleCollapseAndScrollToAbout}
                                className="flagship-terminal-action flagship-terminal-action-muted flex items-center justify-center gap-2 border px-8 py-4 transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                              >
                                <Minus className="w-4 h-4" />
                                COLLAPSE SYSTEM
                              </button>

                              <button
                                onClick={scrollToAbout}
                                className="flagship-terminal-action flagship-terminal-action-primary flex items-center justify-center gap-2 border px-8 py-4 transition-colors duration-200 hover:border-[var(--accent-steel)] hover:bg-[var(--accent-steel)] hover:bg-opacity-10"
                              >
                                CONTINUE TO ABOUT
                                <ArrowDown className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center justify-center">
                            <SystemDiagram phase={phase.id} />
                          </div>

                          {phase.id !== 'integration' && (
                            <div className="border-t border-[var(--gray-800)] pt-6">
                              <p className="flagship-summary max-w-3xl">
                                Use spine navigator to explore each subsystem. Experimental platform designed for 
                                eventual real-world deployment with scalable architecture for higher-power aerial platforms.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
