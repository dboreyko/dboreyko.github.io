import { Hero } from '@/app/components/Hero';
import { FlagshipSystem } from '@/app/components/FlagshipSystem';
import { About } from '@/app/components/About';
import { ExperienceMetrics } from '@/app/components/ExperienceMetrics';
import { Projects } from '@/app/components/Projects';
import { Contact } from '@/app/components/Contact';

export default function App() {
  return (
    <div 
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <Hero />
      <FlagshipSystem />
      <About />
      <ExperienceMetrics />
      <Projects />
      <Contact />
    </div>
  );
}
