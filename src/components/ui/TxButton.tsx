import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Hexagon } from 'lucide-react'
import { cn } from '@/lib/cn'

type TxState = 'idle' | 'broadcasting' | 'confirming' | 'confirmed'

const STATE_LABEL: Record<TxState, string> = {
  idle: '',
  broadcasting: 'Broadcasting…',
  confirming: 'Confirming…',
  confirmed: 'Confirmed',
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type TxButtonProps = {
  children: ReactNode
  onConfirm?: () => void | Promise<void>
  canStart?: () => boolean
  icon?: ReactNode
  variant?: 'solid' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export function TxButton({
  children,
  onConfirm,
  canStart,
  icon,
  variant = 'solid',
  className,
  type = 'button',
}: TxButtonProps) {
  const [state, setState] = useState<TxState>('idle')
  const busy = state !== 'idle'

  async function handleClick() {
    if (busy) return
    if (canStart && !canStart()) return
    setState('broadcasting')
    await wait(450)
    setState('confirming')
    await wait(450)
    try {
      await onConfirm?.()
    } finally {
      setState('confirmed')
      await wait(1100)
      setState('idle')
    }
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={busy}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative inline-flex min-w-[10rem] items-center justify-center gap-2 overflow-hidden rounded-md px-5 py-2.5 font-mono text-sm font-medium transition-colors duration-200',
        variant === 'solid'
          ? 'bg-neon-cyan text-void hover:bg-neon-cyan/90'
          : 'border border-neon-cyan/40 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10',
        state === 'confirmed' && 'ring-2 ring-neon-green/70',
        busy && 'cursor-wait',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            {icon}
            {children}
          </motion.span>
        )}

        {(state === 'broadcasting' || state === 'confirming') && (
          <motion.span
            key="pending"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <Hexagon className="size-4 animate-spin" strokeWidth={2.5} />
            {STATE_LABEL[state]}
          </motion.span>
        )}

        {state === 'confirmed' && (
          <motion.span
            key="confirmed"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 text-neon-green"
          >
            <Check className="size-4" strokeWidth={3} />
            {STATE_LABEL.confirmed}
          </motion.span>
        )}
      </AnimatePresence>

      {state === 'confirmed' && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-md bg-neon-green/25"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.button>
  )
}
