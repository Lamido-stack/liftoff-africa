import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

// Floating particles component for ambient effect
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<Mesh[]>([])
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Each particle floats at different speeds and patterns
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002
        particle.position.x += Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.001
        particle.rotation.x += 0.01
        particle.rotation.y += 0.005
      }
    })
  })
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          position={[
            1 + (Math.random() - 0.3) * 4,  // Keep particles more to the right
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ]}
        >
          <octahedronGeometry args={[0.04, 0]} />
          <meshStandardMaterial
            color="#64ffda"
            emissive="#0891b2"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

const Rocket: React.FC = () => {
  const rocketRef = useRef<Mesh>(null!)
  const flameRef = useRef<Mesh>(null!)
  const glowRef = useRef<Mesh>(null!)
  const stripeRef1 = useRef<Mesh>(null!)
  const stripeRef2 = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (rocketRef.current) {
      // Smoother, more graceful floating motion like in zero gravity
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.4 + 0.1
      
      // Slower, more elegant rotation for better viewing
      rocketRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      // Gentle banking motion like a spacecraft adjusting course
      rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
      
      // Subtle depth movement for 3D effect
      rocketRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
        // Add slight X-axis movement for more dynamic floating
      rocketRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
    
    // More dynamic engine flame animation
    if (flameRef.current) {
      const flameIntensity = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.4
      flameRef.current.scale.y = flameIntensity
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.25
      flameRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.25
        // Add flame flickering effect
      const material = flameRef.current.material as any
      if (material && material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 12) * 0.3
      }
    }
    
    // Animate engine glow
    if (glowRef.current) {
      const glowPulse = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.15
      const material = glowRef.current.material as any
      if (material && material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = glowPulse
      }
    }
    
    // Animate rocket stripes
    if (stripeRef1.current && stripeRef2.current) {
      const stripePulse = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      const material1 = stripeRef1.current.material as any
      const material2 = stripeRef2.current.material as any
      if (material1 && material1.emissiveIntensity !== undefined) {
        material1.emissiveIntensity = stripePulse
      }
      if (material2 && material2.emissiveIntensity !== undefined) {
        material2.emissiveIntensity = stripePulse
      }
    }
  })
  
  return (
    <>
      <FloatingParticles />
      <group ref={rocketRef} position={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
        {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial 
          color="#f1f5f9" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Rocket Nose Cone */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.3, 0.8, 16]} />
        <meshStandardMaterial 
          color="#ef4444" 
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>
      
      {/* Rocket Fins */}
      <mesh position={[0.4, -0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[-0.4, -0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.8, 0.4]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.05, 0.6, 0.1]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.8, -0.4]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.05, 0.6, 0.1]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
      </mesh>
      
      {/* Engine Flame Effect with Animation */}
      <mesh ref={flameRef} position={[0, -1.5, 0]}>
        <coneGeometry args={[0.15, 0.8, 8]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#f59e0b" 
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Secondary flame for more realism */}
      <mesh position={[0, -1.3, 0]}>
        <coneGeometry args={[0.1, 0.4, 6]} />
        <meshStandardMaterial 
          color="#fb923c" 
          emissive="#ea580c" 
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Window */}
      <mesh position={[0, 0.5, 0.31]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.8}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Rocket Stripes */}
      <mesh ref={stripeRef1} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.1, 16]} />
        <meshStandardMaterial 
          color="#64ffda" 
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={stripeRef2} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.1, 16]} />
        <meshStandardMaterial 
          color="#64ffda" 
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Engine Glow Effect */}
      <mesh ref={glowRef} position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#f59e0b" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Engine Bell */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.2, 16]} />
        <meshStandardMaterial 
          color="#6b7280" 
          metalness={0.8}
          roughness={0.2}
        />      </mesh>
    </group>
    </>
  )
}

export default Rocket
