import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Grid } from '@react-three/drei'
import * as THREE from 'three'

/* ── Starfield particles ─────────────────────────────────────────── */
const Particles = ({ count = 1200 }) => {
  const ref = useRef()
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 22
      p[i * 3 + 1] = (Math.random() - 0.5) * 22
      p[i * 3 + 2] = (Math.random() - 0.5) * 22 - 4
    }
    return p
  }, [count])

  useFrame(() => {
    ref.current.rotation.y += 0.0003
    ref.current.rotation.x += 0.0001
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#93c5fd" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ── Neural-network node graph ───────────────────────────────────── */
const NetworkGraph = () => {
  const groupRef = useRef()

  const { nodePositions, linePositions } = useMemo(() => {
    const NODE_COUNT = 28
    const raw = Array.from({ length: NODE_COUNT }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 7 - 2
    ))

    const lines = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (raw[i].distanceTo(raw[j]) < 4.2) {
          lines.push(
            raw[i].x, raw[i].y, raw[i].z,
            raw[j].x, raw[j].y, raw[j].z
          )
        }
      }
    }

    return {
      nodePositions: raw,
      linePositions: new Float32Array(lines),
    }
  }, [])

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.elapsedTime * 0.06
  })

  return (
    <group ref={groupRef}>
      {/* edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.18} />
      </lineSegments>

      {/* nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      ))}
    </group>
  )
}

/* ── Wireframe geometric shapes ──────────────────────────────────── */
const WireframeShape = ({ position, initRot = [0, 0, 0], speedX = 0.005, speedY = 0.008, color, geo }) => {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x += speedX
    ref.current.rotation.y += speedY
  })
  return (
    <mesh ref={ref} position={position} rotation={initRot} geometry={geo}>
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  )
}

const wireGeos = {
  ico:   new THREE.IcosahedronGeometry(0.8, 0),
  octa:  new THREE.OctahedronGeometry(0.8),
  torus: new THREE.TorusGeometry(0.65, 0.2, 8, 22),
  tetra: new THREE.TetrahedronGeometry(0.85),
}

/* ── Floating torus knot ─────────────────────────────────────────── */
const TorusKnotMesh = () => {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.28
    ref.current.rotation.y = clock.elapsedTime * 0.18
  })
  return (
    <Float speed={1.4} floatIntensity={0.5}>
      <mesh ref={ref} position={[3.2, 1.2, -1.5]}>
        <torusKnotGeometry args={[0.62, 0.16, 110, 16]} />
        <meshStandardMaterial color="#3b82f6" wireframe metalness={1} roughness={0.1} />
      </mesh>
    </Float>
  )
}

/* ── Orbiting rings ──────────────────────────────────────────────── */
const TechRing = ({ position, speedX, speedZ, color, radius }) => {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x += speedX
    ref.current.rotation.z += speedZ
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, radius * 0.018, 4, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} />
    </mesh>
  )
}

/* ── Holographic grid floor ──────────────────────────────────────── */
const HoloGrid = () => (
  <Grid
    position={[0, -4.5, 0]}
    args={[40, 40]}
    cellSize={0.9}
    cellThickness={0.4}
    cellColor="#1d4ed8"
    sectionSize={4.5}
    sectionThickness={0.6}
    sectionColor="#3b82f6"
    fadeDistance={28}
    fadeStrength={1.8}
    infiniteGrid
  />
)

/* ── Scene ───────────────────────────────────────────────────────── */
const Scene = () => (
  <>
    <ambientLight intensity={0.15} />
    <pointLight position={[6, 6, 6]}   intensity={2.5} color="#3b82f6" />
    <pointLight position={[-6, -6, -6]} intensity={2.0} color="#6366f1" />
    <pointLight position={[0, 12, 0]}  intensity={1.2} color="#0ea5e9" />

    <Particles count={1200} />
    <NetworkGraph />
    <HoloGrid />
    <TorusKnotMesh />

    <WireframeShape position={[-4.2, 2.2, -1]}   initRot={[0.5, 0, 0]}    speedX={0.004} speedY={0.006} color="#3b82f6" geo={wireGeos.ico}   />
    <WireframeShape position={[4.2, -1.2, -1]}   initRot={[0, 0.3, 0]}    speedX={0.005} speedY={0.008} color="#6366f1" geo={wireGeos.octa}  />
    <WireframeShape position={[-3, -2.4, -2]}    initRot={[0.2, 0, 0.5]}  speedX={0.003} speedY={0.005} color="#0ea5e9" geo={wireGeos.torus} />
    <WireframeShape position={[2.2, 2.8, -3]}    initRot={[0, 0, 0]}      speedX={0.005} speedY={0.007} color="#8b5cf6" geo={wireGeos.tetra} />

    <TechRing position={[0, 0, -1]}    speedX={0.003} speedZ={0.002} color="#3b82f6" radius={5.2} />
    <TechRing position={[0, 0, -2]}    speedX={0.002} speedZ={0.0015} color="#6366f1" radius={7.5} />
    <TechRing position={[1, -1, -1.5]} speedX={0.004} speedZ={0.003} color="#0ea5e9" radius={3.6} />
  </>
)

/* ── Export ──────────────────────────────────────────────────────── */
const Background3D = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
    <Canvas camera={{ position: [0, 2, 9], fov: 68 }} dpr={[1, 1.5]}>
      <Scene />
    </Canvas>
  </div>
)

export default Background3D
