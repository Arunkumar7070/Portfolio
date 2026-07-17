import { SectionReveal, RevealItem } from '@/components/ui/SectionReveal'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="bg-surface/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionReveal label="[ BLOCK #04 · PROJECTS VALIDATED ]">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              // on_chain_record
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Projects</h2>
            <p className="mt-3 max-w-xl text-muted">
              Shipped and in-flight builds — each one a real deployed system, not a tutorial clone.
            </p>
          </RevealItem>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
