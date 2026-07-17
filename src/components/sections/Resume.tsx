import { Eye } from 'lucide-react'
import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { TxButton } from '@/components/ui/TxButton'

function viewResume() {
  window.open('/resume.png', '_blank', 'noopener,noreferrer')
}

export function Resume() {
  return (
    <section id="resume" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionReveal label="[ BLOCK #05 · RESUME VALIDATED ]">
          <RevealItem className="rounded-xl border border-border bg-surface/70 p-8 text-center sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // export_record
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Resume</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              A single exported snapshot of everything above — experience, skills, and shipped
              projects.
            </p>
            <div className="mt-8 flex justify-center">
              <TxButton onConfirm={viewResume} icon={<Eye className="size-4" />}>
                View Resume
              </TxButton>
            </div>
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  )
}
