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
              <h2 className="section-title mb-4">
                About
              </h2>
              <div className="w-12 h-0.5 bg-[var(--accent-steel)]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <p
                className="body-lg mb-6"
              >
                Focused on autonomous aerospace systems, sensing, control, and integration. 
                Building experimental platforms designed for real-world deployment and scaled 
                implementation in survey, observation, and human-systems interaction.
              </p>
              
              <p
                className="body-md"
              >
                Trajectory toward senior-level systems engineering. Precision over novelty. 
                Deployment over demonstration.
              </p>
            </div>

            {/* Education */}
            <div className="pt-8 border-t border-[var(--gray-300)]">
              <h3 className="subtitle-tight mb-4">
                Education
              </h3>
              <div className="space-y-2">
                <p className="body-education-title">
                  University of Alabama
                </p>
                <p className="body-education-detail">
                  Aerospace Engineering & Business Administration
                </p>
                <p className="body-education-meta">
                  Freshman
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="pt-8 border-t border-[var(--gray-300)]">
              <h3 className="subtitle-tight mb-4">
                Languages
              </h3>
              <div className="flex gap-6">
                <span className="language-item">English</span>
                <span className="language-item">Russian</span>
                <span className="language-item text-[var(--gray-600)]">
                  Spanish <span className="language-meta">(conversational)</span>
                </span>
                <span className="language-item text-[var(--gray-600)]">
                  Japanese <span className="language-meta">(basic)</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
