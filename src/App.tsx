import { Suspense, lazy } from 'react'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Resume } from '@/components/sections/Resume'
import { Certificates } from '@/components/sections/Certificates'
import { Contact } from '@/components/sections/Contact'

const NodeNetwork = lazy(() =>
  import('@/components/three/NodeNetwork').then((m) => ({ default: m.NodeNetwork })),
)

function App() {
  return (
    <>
      <LoadingScreen />
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-void bg-grid" />}>
        <NodeNetwork />
      </Suspense>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Resume />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
