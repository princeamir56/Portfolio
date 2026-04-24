import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  image?: string;
}

interface CertificationCardProps {
  cert: Certification;
}

export function CertificationCard({ cert }: CertificationCardProps) {
  const [showModal, setShowModal] = useState(false);
  const hasLink = !!cert.credentialUrl;
  const hasImage = !!cert.image;

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group cursor-pointer rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 transition duration-300 hover:border-[var(--color-accent-strong)]/30 hover:shadow-[0_8px_30px_rgba(34,211,238,0.08)]"
        onClick={() => {
          if (hasImage) setShowModal(true);
          else if (hasLink) window.open(cert.credentialUrl, '_blank');
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-accent-strong)]/20 bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] transition group-hover:scale-110">
            <Award className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-[var(--color-text-strong)] group-hover:text-[var(--color-accent-strong)] transition">{cert.name}</p>
            <p className="mt-2 text-sm text-[var(--color-text-soft)]">
              {cert.issuer} &middot; {cert.year}
            </p>
          </div>
          {hasLink && (
            <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-text-soft)] opacity-0 transition group-hover:opacity-100" />
          )}
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {showModal && hasImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="relative max-h-[90vh] max-w-3xl overflow-auto rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-strong)]">{cert.name}</h3>
                    <p className="text-sm text-[var(--color-text-soft)]">{cert.issuer} &middot; {cert.year}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLink && (
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]">
                        Verify <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button onClick={() => setShowModal(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <img src={cert.image} alt={cert.name} className="w-full rounded-2xl border border-[var(--color-border)]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
