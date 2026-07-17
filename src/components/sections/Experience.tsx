import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { experience } from '@/data/experience'

function TimelineNode({ entry }: { entry: (typeof experience)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })
  const Icon = entry.type === 'work' ? Briefcase : GraduationCap

  return (
    <div ref={ref} className="relative pl-14 pb-12 last:pb-0 sm:pl-20">
      <motion.span
        className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border sm:size-12"
        initial={false}
        animate={
          inView
            ? {
                borderColor: 'rgba(77,250,255,0.8)',
                backgroundColor: 'rgba(77,250,255,0.12)',
                boxShadow: '0 0 20px rgba(77,250,255,0.45)',
              }
            : {
                borderColor: 'rgba(124,138,165,0.35)',
                backgroundColor: 'rgba(10,14,23,0.8)',
                boxShadow: '0 0 0 rgba(77,250,255,0)',
              }
        }
        transition={{ duration: 0.5 }}
      >
        <Icon className={inView ? 'size-4 text-neon-cyan sm:size-5' : 'size-4 text-muted sm:size-5'} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-lg border border-border bg-surface/60 p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-sm font-semibold text-ink sm:text-base">{entry.title}</h3>
          <span className="font-mono text-xs text-neon-cyan">{entry.period}</span>
        </div>
        <p className="mt-1 text-sm text-neon-violet">{entry.org}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionReveal label="[ BLOCK #03 · EXPERIENCE VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // chain_of_experience
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Experience</h2>
          </RevealItem>

          <div ref={containerRef} className="relative mt-12">
            <div className="absolute left-[17px] top-0 h-full w-px bg-border sm:left-[23px]" />
            <motion.div
              className="absolute left-[17px] top-0 w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent sm:left-[23px]"
              style={{ scaleY, height: '100%' }}
            />

            {experience.map((entry) => (
              <TimelineNode key={entry.id} entry={entry} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
