import { motion } from 'motion/react';

const metrics = [
  {
    value: '5+',
    unit: 'years',
    label: 'Fusion 360',
    sublabel: '100+ hrs CAD',
  },
  {
    value: '6+',
    unit: 'hours',
    label: 'Manual FPV Flight Time',
    sublabel: 'High-speed acrobatic',
  },
];

export function ExperienceMetrics() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-12"
            style={{
              fontSize: '0.875rem',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '0.1em',
              color: 'var(--gray-600)',
              textTransform: 'uppercase',
            }}
          >
            Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-2 pl-8"
                style={{ borderColor: 'var(--gray-300)' }}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 'var(--font-weight-light)',
                      lineHeight: '1',
                      color: 'var(--gray-900)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {metric.value}
                  </span>
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'var(--font-weight-normal)',
                      color: 'var(--gray-600)',
                    }}
                  >
                    {metric.unit}
                  </span>
                </div>
                <p
                  className="mb-1"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--gray-800)',
                  }}
                >
                  {metric.label}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)',
                  }}
                >
                  {metric.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
