import { Eye } from 'lucide-react'
import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { certificates } from '@/data/certificates'

export function Certificates() {
  return (
    <section id="certificates" className="bg-surface/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionReveal label="[ BLOCK #06 · CERTIFICATES VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // credentials
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Certificates</h2>
          </RevealItem>

          {certificates.length === 0 ? (
            <RevealItem className="mt-10 rounded-lg border border-dashed border-border bg-surface/40 px-6 py-10 text-center font-mono text-sm text-muted">
              [ no certificates indexed yet — check back soon ]
            </RevealItem>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {certificates.map((cert) => (
                <RevealItem key={cert.id}>
                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="group card-border-trace relative block overflow-hidden rounded-xl border border-border bg-surface/70"
                  >
                    <img
                      src={cert.image}
                      alt={cert.label}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="flex items-center justify-between border-t border-border bg-surface/90 px-4 py-3">
                      <span className="font-mono text-sm text-ink">{cert.label}</span>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-neon-cyan">
                        <Eye className="size-3.5" /> View
                      </span>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
