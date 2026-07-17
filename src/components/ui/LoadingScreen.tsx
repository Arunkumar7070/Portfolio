import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const HEX = '0123456789abcdef'
const TARGET = '0x' + '7f3a91c4d208e6b5'.slice(0, 16)
const DURATION_MS = 1300

function randomHex(length: number) {
  let out = ''
  for (let i = 0; i < length; i++) out += HEX[Math.floor(Math.random() * HEX.length)]
  return out
}

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [display, setDisplay] = useState(() => '0x' + randomHex(16))
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t
      const elapsed = t - startRef.current
      const progress = Math.min(elapsed / DURATION_MS, 1)

      if (progress < 1) {
        const resolvedChars = Math.floor(progress * TARGET.length)
        let next = ''
        for (let i = 0; i < TARGET.length; i++) {
          if (i < 2) next += TARGET[i]
          else if (i < resolvedChars) next += TARGET[i]
          else next += HEX[Math.floor(Math.random() * HEX.length)]
        }
        setDisplay(next)
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(TARGET)
        setTimeout(() => setDone(true), 220)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-muted">hashing block…</div>
          <div className="font-mono text-2xl text-neon-cyan text-glow-cyan sm:text-3xl">
            {display}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
