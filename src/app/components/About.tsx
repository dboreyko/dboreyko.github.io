import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about-section" className="min-h-screen flex items-center py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-12"
        >
          {/* Left: Title */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2
                className="mb-4"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                  color: 'var(--gray-900)',
                }}
              >
                About
              </h2>
              <div className="w-12 h-0.5 bg-[var(--accent-steel)]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <p
                className="mb-6"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: 'var(--gray-700)',
                }}
              >
                Focused on autonomous aerospace systems, sensing, control, and integration. 
                Building experimental platforms designed for real-world deployment and scaled 
                implementation in survey, observation, and human-systems interaction.
              </p>
              
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: 'var(--gray-600)',
                }}
              >
                Trajectory toward senior-level systems engineering. Precision over novelty. 
                Deployment over demonstration.
              </p>
            </div>

            {/* Education */}
            <div className="pt-8 border-t" style={{ borderColor: 'var(--gray-300)' }}>
              <h3
                className="mb-4"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.05em',
                  color: 'var(--gray-900)',
                  textTransform: 'uppercase',
                }}
              >
                Education
              </h3>
              <div className="space-y-2">
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--gray-800)',
                  }}
                >
                  University of Alabama
                </p>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--gray-600)',
                  }}
                >
                  Aerospace Engineering & Business Administration
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)',
                  }}
                >
                  Freshman
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="pt-8 border-t" style={{ borderColor: 'var(--gray-300)' }}>
              <h3
                className="mb-4"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.05em',
                  color: 'var(--gray-900)',
                  textTransform: 'uppercase',
                }}
              >
                Languages
              </h3>
              <div className="flex gap-6">
                <span style={{ fontSize: '0.9375rem', color: 'var(--gray-700)' }}>English</span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--gray-700)' }}>Russian</span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--gray-600)' }}>Spanish <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>(conversational)</span></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}