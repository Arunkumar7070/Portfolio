import { motion } from 'framer-motion'

function pseudoHex(input: string) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return `0x${hex.slice(0, 3)}…${hex.slice(-3)}`
}

export function SkillChip({ label, index = 0 }: { label: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -3 }}
      className="group mini-contract flex flex-col items-center gap-1 rounded-lg bg-surface/70 px-4 py-2.5 text-center"
    >
      <span className="font-mono text-sm text-ink">{label}</span>
      <span className="max-h-0 overflow-hidden font-mono text-[10px] text-neon-cyan/70 opacity-0 transition-all duration-300 group-hover:max-h-4 group-hover:opacity-100">
        {pseudoHex(label)}
      </span>
    </motion.div>
  )
}
