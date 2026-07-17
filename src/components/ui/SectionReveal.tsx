import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type SectionRevealProps = {
  children: ReactNode
  label?: string
  className?: string
}

export function SectionReveal({ children, label, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      {inView && label && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 font-mono text-[11px] tracking-[0.2em] text-neon-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, times: [0, 0.15, 0.7, 1], delay: 0.15 }}
        >
          {label}
        </motion.div>
      )}

      {inView && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-neon-cyan/25 via-neon-cyan/5 to-transparent"
          initial={{ y: '-20%', opacity: 1 }}
          animate={{ y: '110%', opacity: [1, 1, 0] }}
          transition={{ duration: 1, ease: 'easeIn' }}
        />
      )}

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
