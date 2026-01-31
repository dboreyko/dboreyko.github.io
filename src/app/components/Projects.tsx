import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface Project {
  title: string;
  description: string;
  status: string;
  deepLink?: string;
  evidence?: {
    type: 'video' | 'photos' | 'cad' | 'logs';
    url?: string;
    images?: { src: string; caption: string }[];
  }[];
}

const personalProjects: Project[] = [
  {
    title: '5" Freestyle FPV Quadcopter',
    description: 'Long-range, high-speed, acrobatic',
    status: 'Flight Tested',
    evidence: [
      { type: 'video', url: 'https://youtube.com/@thermal5524' },
      { 
        type: 'photos',
        images: [
          { src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80', caption: 'FPV Quadcopter - Assembly' },
          { src: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&q=80', caption: 'FPV Quadcopter - Flight Test' },
        ]
      },
    ],
  },
  {
    title: 'DIY Variable Power Supply',
    description: '48V 10A, LiPo-powered',
    status: 'Operational',
  },
  {
    title: 'Car Subwoofer Integration',
    description: 'Clean wiring, improvised amp solution',
    status: 'Deployed',
  },
  {
    title: 'Engineering Portfolio Website',
    description: 'Concept → Figma → VS Code, Codex-assisted',
    status: 'Live',
  },
  {
    title: 'Early Fusion 360 / Airsoft Prototypes',
    description: 'Large-format 3D printing experiments',
    status: 'Archived',
    evidence: [
      { type: 'cad', url: '#' },
    ],
  },
  {
    title: 'Sugar Rocket Experiment',
    description: 'DIY propellant and ignition',
    status: 'Prototype',
    evidence: [
      { 
        type: 'photos',
        images: [
          { src: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&q=80', caption: 'Sugar Rocket - Propellant Preparation' },
        ]
      },
    ],
  },
];

const universityProjects: Project[] = [
  {
    title: 'ARA IREC Airbrakes Design',
    description: 'Mechanism design & CAD (Fusion 360) for Alabama Rocketry Association competition vehicles',
    status: 'In Development',
    evidence: [
      { type: 'cad', url: '#' },
    ],
  },
  {
    title: 'NASA Student Launch (NSL) Intro Rocket Support',
    description: 'Assembly and launch operations',
    status: 'Complete',
  },
  {
    title: 'Quadcopter Build (Lab-Assisted)',
    description: 'Independent build with university lab guidance',
    status: 'In Development',
    deepLink: 'flagship-integration',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; caption: string }[]>([]);

  const handleEvidenceClick = (evidence: Project['evidence'][0]) => {
    if (evidence.type === 'photos' && evidence.images) {
      setLightboxImages(evidence.images);
      setLightboxIndex(0);
      setLightboxOpen(true);
    } else if (evidence.url) {
      window.open(evidence.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTitleClick = () => {
    if (project.deepLink === 'flagship-integration') {
      const expandFn = (window as any).expandFlagshipSystem;
      if (expandFn) {
        expandFn('integration');
      }
    }
  };

  return (
    <>
      <div className="group space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h4
            onClick={project.deepLink ? handleTitleClick : undefined}
            className={`project-title flex-1 relative ${project.deepLink ? 'cursor-pointer' : ''}`}
          >
            <span className="relative inline-flex items-center gap-1.5">
              {project.title}
              {project.deepLink && (
                <ArrowUpRight 
                  className="project-link-icon w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  strokeWidth={2}
                />
              )}
              {project.deepLink && (
                <span 
                  className="project-underline absolute bottom-0 left-0 w-0 h-px bg-[var(--gray-900)] transition-all duration-300 group-hover:w-full"
                />
              )}
            </span>
          </h4>
          <span
            className="project-status px-2 py-0.5 flex-shrink-0"
          >
            {project.status}
          </span>
        </div>
        
        <p className="project-description">
          {project.description}
        </p>

        {project.evidence && project.evidence.length > 0 && (
          <div className="flex items-center gap-4 pt-2">
            {project.evidence.map((evidence, idx) => (
              <button
                key={idx}
                onClick={() => handleEvidenceClick(evidence)}
                className="project-evidence group/link flex items-center gap-1.5 relative cursor-pointer"
              >
                <span className="relative">
                  {evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-px bg-[var(--gray-900)] transition-all duration-300 group-hover/link:w-full"
                  />
                </span>
                <ArrowUpRight 
                  className="project-link-icon w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

export function Projects() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-16">
            <h2 className="section-title">
              Projects
            </h2>
            <span className="projects-status px-3 py-1 border uppercase tracking-wider">
              In Development
            </span>
          </div>

          {/* Personal Projects */}
          <div className="mb-20">
            <h3 className="subtitle-wide mb-8 pb-3 border-b border-[var(--gray-300)]">
              Personal
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {personalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* University / Clubs */}
          <div>
            <h3 className="subtitle-wide mb-8 pb-3 border-b border-[var(--gray-300)]">
              University / Clubs
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {universityProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
