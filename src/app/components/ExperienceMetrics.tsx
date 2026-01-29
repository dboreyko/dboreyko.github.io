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
          <h2 className="section-eyebrow mb-12">
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
                className="border-l-2 border-[var(--gray-300)] pl-8"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="metric-value">
                    {metric.value}
                  </span>
                  <span className="metric-unit">
                    {metric.unit}
                  </span>
                </div>
                <p className="metric-label mb-1">
                  {metric.label}
                </p>
                <p className="metric-sublabel">
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
