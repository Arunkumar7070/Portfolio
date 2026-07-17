import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'

const HIGHLIGHTS = [
  {
    emoji: '💻',
    text: 'Passionate about building scalable software and solving real-world engineering challenges.',
  },
  {
    emoji: '🚀',
    text: 'Enjoy transforming ideas into production-ready applications with clean, maintainable architectures.',
  },
  {
    emoji: '🌱',
    text: 'Constantly exploring emerging technologies in AI, backend engineering, cloud, and blockchain.',
  },
  {
    emoji: '🤝',
    text: 'Believe in writing reliable code, learning continuously, and building products that create meaningful impact.',
  },
]

export function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionReveal label="[ BLOCK #01 · ABOUT VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// who_am_i</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">About Me</h2>
          </RevealItem>

          <ul className="mt-10 max-w-3xl space-y-5">
            {HIGHLIGHTS.map((item) => (
              <RevealItem key={item.text}>
                <li className="flex items-start gap-3 text-base leading-relaxed text-muted sm:text-lg">
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.text}</span>
                </li>
              </RevealItem>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  )
}
