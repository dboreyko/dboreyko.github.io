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
            className={`flex-1 relative ${project.deepLink ? 'cursor-pointer' : ''}`}
            style={{
              fontSize: '1rem',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--gray-900)',
              lineHeight: '1.4',
            }}
          >
            <span className="relative inline-flex items-center gap-1.5">
              {project.title}
              {project.deepLink && (
                <ArrowUpRight 
                  className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: 'var(--gray-900)' }}
                  strokeWidth={2}
                />
              )}
              {project.deepLink && (
                <span 
                  className="absolute bottom-0 left-0 w-0 h-px bg-[var(--gray-900)] transition-all duration-300 group-hover:w-full"
                  style={{ marginTop: '2px' }}
                />
              )}
            </span>
          </h4>
          <span
            className="px-2 py-0.5 flex-shrink-0"
            style={{
              fontSize: '0.625rem',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--gray-500)',
              backgroundColor: 'var(--gray-200)',
              letterSpacing: '0.03em',
            }}
          >
            {project.status}
          </span>
        </div>
        
        <p
          style={{
            fontSize: '0.875rem',
            lineHeight: '1.6',
            color: 'var(--gray-600)',
          }}
        >
          {project.description}
        </p>

        {project.evidence && project.evidence.length > 0 && (
          <div className="flex items-center gap-4 pt-2">
            {project.evidence.map((evidence, idx) => (
              <button
                key={idx}
                onClick={() => handleEvidenceClick(evidence)}
                className="group/link flex items-center gap-1.5 relative cursor-pointer"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--gray-500)',
                  letterSpacing: '0.03em',
                }}
              >
                <span className="relative">
                  {evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-px bg-[var(--gray-900)] transition-all duration-300 group-hover/link:w-full"
                  />
                </span>
                <ArrowUpRight 
                  className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                  style={{ color: 'var(--gray-900)' }}
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
          <h2
            className="mb-16"
            style={{
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: 'var(--gray-900)',
            }}
          >
            Projects
          </h2>

          {/* Personal Projects */}
          <div className="mb-20">
            <h3
              className="mb-8 pb-3 border-b"
              style={{
                fontSize: '0.875rem',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.1em',
                color: 'var(--gray-700)',
                textTransform: 'uppercase',
                borderColor: 'var(--gray-300)',
              }}
            >
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
            <h3
              className="mb-8 pb-3 border-b"
              style={{
                fontSize: '0.875rem',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.1em',
                color: 'var(--gray-700)',
                textTransform: 'uppercase',
                borderColor: 'var(--gray-300)',
              }}
            >
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