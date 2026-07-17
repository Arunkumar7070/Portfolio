import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Code2, Globe, Mail } from 'lucide-react'
import { site } from '@/data/site'

const BlockchainChain = lazy(() =>
  import('@/components/three/BlockchainChain').then((m) => ({ default: m.BlockchainChain })),
)

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center px-6 pt-24">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1 font-mono text-[11px] tracking-widest text-neon-green"
        >
          <span className="size-1.5 animate-pulse-slow rounded-full bg-neon-green" />
          AVAILABLE FOR WEB3 &amp; BACKEND ROLES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-semibold leading-tight text-ink sm:text-6xl"
        >
          Hi, I&apos;m <span className="text-neon-cyan text-glow-cyan">Arunkumar</span>
          <br />
          building on-chain systems &amp; the infra behind them
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl font-mono text-sm text-muted sm:text-base"
        >
          <span className="text-neon-violet">const</span> focus = [
          <span className="text-neon-cyan">&quot;AI&quot;</span>,{' '}
          <span className="text-neon-cyan">&quot;Blockchain&quot;</span>,{' '}
          <span className="text-neon-cyan">&quot;Smart Contract&quot;</span>,{' '}
          <span className="text-neon-cyan">&quot;Backend&quot;</span>]
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-md bg-neon-cyan px-5 py-2.5 font-mono text-sm font-medium text-void transition-colors hover:bg-neon-cyan/90"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-neon-cyan/40 px-5 py-2.5 font-mono text-sm font-medium text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10"
          >
            Get in Touch
          </a>

          <div className="ml-1 flex items-center gap-4 text-muted">
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-neon-cyan">
              <Globe className="size-5" />
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-neon-cyan">
              <Code2 className="size-5" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-neon-cyan">
              <Mail className="size-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-5xl">
        <Suspense fallback={<div className="h-40 sm:h-52" />}>
          <BlockchainChain />
        </Suspense>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  )
}
