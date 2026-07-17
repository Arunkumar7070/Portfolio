import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { usePageVisibility } from '@/hooks/usePageVisibility'

const BLOCK_COUNT = 6
const SPACING = 2.6
const CYAN = '#4dfaff'
const VIOLET = '#a06bff'

function Block({
  index,
  started,
  active,
}: {
  index: number
  started: boolean
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const scaleRef = useRef(0)
  const x = (index - (BLOCK_COUNT - 1) / 2) * SPACING
  const delay = index * 0.15

  useFrame((state, delta) => {
    if (!active) return
    const mesh = meshRef.current
    if (!mesh) return

    mesh.rotation.x += delta * (0.12 + index * 0.01)
    mesh.rotation.y += delta * 0.18

    const elapsed = state.clock.elapsedTime
    const target = started && elapsed > delay ? 1 : 0
    scaleRef.current += (target - scaleRef.current) * Math.min(delta * 4, 1)
    mesh.scale.setScalar(scaleRef.current)
  })

  return (
    <mesh ref={meshRef} position={[x, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? CYAN : VIOLET}
        wireframe
        emissive={index % 2 === 0 ? CYAN : VIOLET}
        emissiveIntensity={0.6}
        toneMapped={false}
      />
    </mesh>
  )
}

function Pulse({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const totalLength = SPACING * (BLOCK_COUNT - 1)
  const startX = -totalLength / 2

  useFrame((state) => {
    if (!active || !ref.current) return
    const t = (state.clock.elapsedTime * 0.35) % 1
    ref.current.position.x = startX + t * totalLength
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.9
  })

  return (
    <mesh ref={ref} position={[startX, 0, 0]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color={CYAN} transparent toneMapped={false} />
    </mesh>
  )
}

function ChainLine() {
  const points = useMemo(() => {
    const totalLength = SPACING * (BLOCK_COUNT - 1)
    const startX = -totalLength / 2
    return [
      [startX, 0, 0],
      [startX + totalLength, 0, 0],
    ] as [number, number, number][]
  }, [])

  return <Line points={points} color={CYAN} transparent opacity={0.25} lineWidth={1} />
}

function Scene({ started, active }: { started: boolean; active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 4]} intensity={40} color={CYAN} />
      <ChainLine />
      <Pulse active={active && started} />
      {Array.from({ length: BLOCK_COUNT }, (_, i) => (
        <Block key={i} index={i} started={started} active={active} />
      ))}
    </>
  )
}

export function BlockchainChain() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-10% 0px -10% 0px' })
  const visible = usePageVisibility()
  const reducedMotion = usePrefersReducedMotion()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])

  if (reducedMotion) {
    return (
      <div className="flex items-center justify-center gap-3 py-10">
        {Array.from({ length: BLOCK_COUNT }, (_, i) => (
          <div
            key={i}
            className="size-8 rounded border border-neon-cyan/50"
            style={{ borderColor: i % 2 === 0 ? CYAN : VIOLET }}
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="h-40 w-full sm:h-52">
      <Canvas
        camera={{ position: [0, 0.6, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Scene started={started} active={visible} />
      </Canvas>
    </div>
  )
}
