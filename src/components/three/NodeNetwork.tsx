import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const NODE_COLOR = new THREE.Color('#4dfaff')
const EDGE_COLOR = new THREE.Color('#4dfaff')
const MAX_LINK_DIST = 3.4
const CURSOR_RADIUS = 3

type Node = {
  pos: THREE.Vector3
  vel: THREE.Vector3
  scale: number
  targetScale: number
  phase: number
}

function makeNode(bounds: number): Node {
  return {
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * bounds,
      (Math.random() - 0.5) * bounds * 0.6,
      (Math.random() - 0.5) * 6,
    ),
    vel: new THREE.Vector3(
      (Math.random() - 0.5) * 0.06,
      (Math.random() - 0.5) * 0.06,
      0,
    ),
    scale: 0,
    targetScale: 0.5 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
  }
}

function Scene({ count, active }: { count: number; active: boolean }) {
  const { viewport } = useThree()
  const bounds = Math.max(viewport.width, 18)
  const nodes = useMemo(() => Array.from({ length: count }, () => makeNode(bounds)), [count, bounds])

  const meshRef = useRef<THREE.InstancedMesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cursor = useRef(new THREE.Vector3(9999, 9999, 0))
  const clock = useRef(0)

  const maxPairs = count * 8
  const linePositions = useMemo(() => new Float32Array(maxPairs * 2 * 3), [maxPairs])
  const lineColors = useMemo(() => new Float32Array(maxPairs * 2 * 3), [maxPairs])

  useFrame((state, delta) => {
    if (!active) return
    clock.current += delta

    const ndcX = state.pointer.x
    const ndcY = state.pointer.y
    cursor.current.set((ndcX * viewport.width) / 2, (ndcY * viewport.height) / 2, 0)

    const half = bounds / 2
    const halfY = (bounds * 0.6) / 2

    for (const n of nodes) {
      n.pos.addScaledVector(n.vel, delta * 20)

      const d = n.pos.distanceTo(cursor.current)
      if (d < CURSOR_RADIUS) {
        const force = (1 - d / CURSOR_RADIUS) * 0.02
        const dir = new THREE.Vector3().subVectors(n.pos, cursor.current).normalize()
        n.pos.addScaledVector(dir, force)
      }

      if (n.pos.x > half || n.pos.x < -half || n.pos.y > halfY || n.pos.y < -halfY) {
        n.pos.set(
          (Math.random() - 0.5) * bounds,
          (Math.random() - 0.5) * bounds * 0.6,
          (Math.random() - 0.5) * 6,
        )
        n.scale = 0
      }

      n.scale += (n.targetScale - n.scale) * delta * 2
    }

    if (meshRef.current) {
      nodes.forEach((n, i) => {
        const pulse = 1 + Math.sin(clock.current * 1.5 + n.phase) * 0.15
        dummy.position.copy(n.pos)
        dummy.scale.setScalar(n.scale * pulse * 0.11)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }

    if (lineRef.current) {
      let vi = 0
      let ci = 0
      let segments = 0
      outer: for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (segments >= maxPairs) break outer
          const a = nodes[i]
          const b = nodes[j]
          const dist = a.pos.distanceTo(b.pos)
          if (dist < MAX_LINK_DIST) {
            const shimmer = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(clock.current * 1.8 + (i + j) * 0.7))
            const alpha = (1 - dist / MAX_LINK_DIST) * shimmer

            linePositions[vi++] = a.pos.x
            linePositions[vi++] = a.pos.y
            linePositions[vi++] = a.pos.z
            linePositions[vi++] = b.pos.x
            linePositions[vi++] = b.pos.y
            linePositions[vi++] = b.pos.z

            lineColors[ci++] = EDGE_COLOR.r * alpha
            lineColors[ci++] = EDGE_COLOR.g * alpha
            lineColors[ci++] = EDGE_COLOR.b * alpha
            lineColors[ci++] = EDGE_COLOR.r * alpha
            lineColors[ci++] = EDGE_COLOR.g * alpha
            lineColors[ci++] = EDGE_COLOR.b * alpha

            segments++
          }
        }
      }
      const geo = lineRef.current.geometry
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
      geo.setDrawRange(0, segments * 2)
    }
  })

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={NODE_COLOR} toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.7} toneMapped={false} />
      </lineSegments>
    </>
  )
}

export function NodeNetwork() {
  const visible = usePageVisibility()
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  if (reducedMotion) {
    return <div className="fixed inset-0 -z-10 bg-void bg-grid" />
  }

  const count = isMobile ? 18 : 55

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Scene count={count} active={visible} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-void/40" />
    </div>
  )
}
