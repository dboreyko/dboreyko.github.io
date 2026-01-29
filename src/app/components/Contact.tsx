import { motion } from 'motion/react';
import { Mail, Youtube, Linkedin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'boreyko.co@gmail.com',
    href: 'mailto:boreyko.co@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'dimitryboreyko',
    href: 'https://linkedin.com/in/dimitryboreyko',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    value: '@thermal5524',
    href: 'https://youtube.com/@thermal5524',
  },
];

export function Contact() {
  return (
    <section id="contact-section" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
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
            Contact
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border p-6 transition-all duration-300 hover:border-[var(--gray-900)]"
                style={{ borderColor: 'var(--gray-300)' }}
              >
                <div className="flex flex-col gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center border transition-all duration-300 group-hover:border-[var(--gray-900)]"
                    style={{ borderColor: 'var(--gray-400)' }}
                  >
                    <contact.icon
                      className="w-5 h-5"
                      style={{ color: 'var(--gray-600)' }}
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <div>
                    <p
                      className="mb-2"
                      style={{
                        fontSize: '0.625rem',
                        fontWeight: 'var(--font-weight-medium)',
                        letterSpacing: '0.1em',
                        color: 'var(--gray-500)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {contact.label}
                    </p>
                    <p
                      className="transition-colors duration-300 group-hover:text-[var(--gray-900)]"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--gray-700)',
                        fontFamily: 'var(--font-mono)',
                        wordBreak: 'break-word',
                      }}
                    >
                      {contact.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 pt-12 border-t"
            style={{ borderColor: 'var(--gray-300)' }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--gray-500)',
                textAlign: 'center',
              }}
            >
              © 2026 Dimitry Boreyko. Precision engineering.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
