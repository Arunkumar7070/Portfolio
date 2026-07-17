import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { SkillChip } from '@/components/ui/SkillChip'
import { skillCategories } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="bg-surface/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionReveal label="[ BLOCK #02 · SKILLS VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // contract_interface
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Skills</h2>
          </RevealItem>

          <div className="mt-12 space-y-10">
            {skillCategories.map((category) => (
              <RevealItem key={category.id}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neon-violet">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <SkillChip key={skill} label={skill} index={i} />
                  ))}
                </div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
