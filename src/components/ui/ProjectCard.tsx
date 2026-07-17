import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/cn'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function resetTilt() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group card-border-trace relative rounded-xl border border-border bg-surface/70 p-6"
    >
      <div className="absolute right-4 top-4 flex items-center gap-1.5">
        {project.status === 'deployed' ? (
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="flex items-center gap-1 rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-1 font-mono text-[10px] text-neon-green"
          >
            <ShieldCheck className="size-3" /> VERIFIED
          </motion.span>
        ) : (
          <span className="flex items-center gap-1 rounded-full border border-neon-amber/40 bg-neon-amber/10 px-2 py-1 font-mono text-[10px] text-neon-amber">
            <Loader2 className="size-3 animate-spin" /> SYNCING
          </span>
        )}
      </div>

      <h3 className="pr-24 font-mono text-lg font-semibold text-ink">{project.name}</h3>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="text-sm text-neon-cyan">{project.tagline}</p>
        {project.period && (
          <span className="font-mono text-[11px] text-muted">· {project.period}</span>
        )}
      </div>

      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        <li>
          <span className="text-neon-violet">What it does:</span> {project.whatItDoes}
        </li>
        {project.functionality && (
          <li>
            <span className="text-neon-violet">Functionality:</span> {project.functionality}
          </li>
        )}
      </ul>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {project.stack.map((tech) => (
          <motion.span
            key={tech}
            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            className="rounded border border-border bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {project.links && project.links.length > 0 && (
        <div className="mt-5 flex gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex items-center gap-1.5 font-mono text-xs text-neon-cyan',
                'transition-colors hover:text-neon-cyan/80',
              )}
            >
              {link.label === 'GitHub' ? (
                <Code2 className="size-3" />
              ) : (
                <ExternalLink className="size-3" />
              )}{' '}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
