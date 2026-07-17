import { useState } from 'react'
import { Check, Code2, Copy, Globe } from 'lucide-react'
import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { site } from '@/data/site'

function CopyEmailChip() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(site.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-surface/70 px-4 py-3 font-mono text-sm text-ink transition-colors hover:border-neon-cyan/50"
    >
      <span className="truncate">{site.email}</span>
      {copied ? (
        <span className="flex shrink-0 items-center gap-1 text-neon-green">
          <Check className="size-4" /> Copied
        </span>
      ) : (
        <Copy className="size-4 shrink-0 text-muted transition-colors group-hover:text-neon-cyan" />
      )}
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionReveal label="[ BLOCK #07 · CONTACT VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // open_channel
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Get in Touch</h2>
            <p className="mt-3 max-w-xl text-muted">
              Have a role, a build, or just want to talk chains? Open a channel below.
            </p>
          </RevealItem>

          <RevealItem className="mx-auto mt-12 max-w-md space-y-4">
            <CopyEmailChip />
            <div className="flex gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface/70 py-3 font-mono text-xs text-muted transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <Globe className="size-4" /> LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface/70 py-3 font-mono text-xs text-muted transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <Code2 className="size-4" /> GitHub
              </a>
            </div>
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  )
}
