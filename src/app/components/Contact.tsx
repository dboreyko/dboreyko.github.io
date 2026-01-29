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
          <h2 className="section-title mb-16">
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
                className="group border border-[var(--gray-300)] p-6 transition-all duration-300 hover:border-[var(--gray-900)]"
              >
                <div className="flex flex-col gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center border border-[var(--gray-400)] transition-all duration-300 group-hover:border-[var(--gray-900)]"
                  >
                    <contact.icon
                      className="contact-card-icon w-5 h-5"
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <div>
                    <p className="contact-card-label mb-2">
                      {contact.label}
                    </p>
                    <p className="contact-card-value transition-colors duration-300 group-hover:text-[var(--gray-900)]">
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
            className="mt-20 pt-12 border-t border-[var(--gray-300)]"
          >
            <p className="contact-footer">
              © 2026 Dimitry Boreyko. Precision engineering.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
