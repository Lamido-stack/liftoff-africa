import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

// Detect mobile device
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768
}

// Floating particles component for ambient effect
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<Mesh[]>([])
  const [mobile, setMobile] = useState(false)
  
  useEffect(() => {
    setMobile(isMobile())
  }, [])
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Reduced animation complexity on mobile
        const speedMultiplier = mobile ? 0.5 : 1
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002 * speedMultiplier
        particle.position.x += Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.001 * speedMultiplier
        particle.rotation.x += 0.01 * speedMultiplier
        particle.rotation.y += 0.005 * speedMultiplier
      }
    })
  })
  
  // Fewer particles on mobile for better performance
  const particleCount = mobile ? 3 : 6
  
  return (
    <group>
      {Array.from({ length: particleCount }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          position={[
            1 + (Math.random() - 0.3) * 4,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ]}
        >
          <octahedronGeometry args={[mobile ? 0.03 : 0.04, 0]} />
          <meshStandardMaterial
            color="#64ffda"
            emissive="#0891b2"
            emissiveIntensity={mobile ? 0.2 : 0.3}
            transparent
            opacity={mobile ? 0.3 : 0.4}
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
  const [mobile, setMobile] = useState(false)
  
  useEffect(() => {
    setMobile(isMobile())
  }, [])
  
  useFrame((state) => {
    if (rocketRef.current) {
      // Smoother, less intensive animations on mobile
      const animationSpeed = mobile ? 0.6 : 1
      const movementIntensity = mobile ? 0.3 : 1
      
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 * animationSpeed) * 0.4 * movementIntensity + 0.1
      rocketRef.current.rotation.y = state.clock.elapsedTime * 0.15 * animationSpeed
      rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 * animationSpeed) * 0.08 * movementIntensity
      rocketRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.4 * animationSpeed) * 0.15 * movementIntensity
      rocketRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3 * animationSpeed) * 0.1 * movementIntensity
    }
    
    // Simplified flame animation on mobile
    if (flameRef.current) {
      const flameSpeed = mobile ? 5 : 10
      const flameIntensity = 1 + Math.sin(state.clock.elapsedTime * flameSpeed) * (mobile ? 0.2 : 0.4)
      flameRef.current.scale.y = flameIntensity
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * (flameSpeed * 0.8)) * (mobile ? 0.15 : 0.25)
      flameRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * (flameSpeed * 0.8)) * (mobile ? 0.15 : 0.25)
      
      const material = flameRef.current.material as any
      if (material && material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = (mobile ? 0.4 : 0.6) + Math.sin(state.clock.elapsedTime * (flameSpeed * 1.2)) * (mobile ? 0.2 : 0.3)
      }
    }
    
    // Simplified glow animation on mobile
    if (glowRef.current) {
      const glowPulse = (mobile ? 0.2 : 0.3) + Math.sin(state.clock.elapsedTime * 4) * (mobile ? 0.1 : 0.15)
      const material = glowRef.current.material as any
      if (material && material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = glowPulse
      }
    }
    
    // Animate rocket stripes with reduced intensity on mobile
    if (stripeRef1.current && stripeRef2.current) {
      const stripePulse = (mobile ? 0.15 : 0.2) + Math.sin(state.clock.elapsedTime * 2) * (mobile ? 0.05 : 0.1)
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
      <group 
        ref={rocketRef} 
        position={[0, 0, 0]} 
        scale={mobile ? [1.2, 1.2, 1.2] : [1.4, 1.4, 1.4]}
      >
        {/* Rocket Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, mobile ? 12 : 16]} />
          <meshStandardMaterial 
            color="#f1f5f9" 
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        
        {/* Rocket Nose Cone */}
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.3, 0.8, mobile ? 12 : 16]} />
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
        
        {/* Engine Flame Effect with Animation - Conditional rendering for very small screens */}
        {(!mobile || window.innerWidth > 480) && (
          <>
            <mesh ref={flameRef} position={[0, -1.5, 0]}>
              <coneGeometry args={[0.15, 0.8, mobile ? 6 : 8]} />
              <meshStandardMaterial 
                color="#fbbf24" 
                emissive="#f59e0b" 
                emissiveIntensity={mobile ? 0.6 : 0.8}
                transparent
                opacity={mobile ? 0.7 : 0.9}
              />
            </mesh>
            
            {/* Secondary flame for more realism */}
            <mesh position={[0, -1.3, 0]}>
              <coneGeometry args={[0.1, 0.4, mobile ? 4 : 6]} />
              <meshStandardMaterial 
                color="#fb923c" 
                emissive="#ea580c" 
                emissiveIntensity={mobile ? 0.8 : 1.0}
                transparent
                opacity={mobile ? 0.5 : 0.7}
              />
            </mesh>
          </>
        )}
        
        {/* Window */}
        <mesh position={[0, 0.5, 0.31]}>
          <circleGeometry args={[0.15, mobile ? 12 : 16]} />
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
          <cylinderGeometry args={[0.31, 0.31, 0.1, mobile ? 12 : 16]} />
          <meshStandardMaterial 
            color="#64ffda" 
            emissive="#0891b2"
            emissiveIntensity={mobile ? 0.15 : 0.2}
          />
        </mesh>
        <mesh ref={stripeRef2} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.1, mobile ? 12 : 16]} />
          <meshStandardMaterial 
            color="#64ffda" 
            emissive="#0891b2"
            emissiveIntensity={mobile ? 0.15 : 0.2}
          />
        </mesh>
        
        {/* Engine Glow Effect */}
        <mesh ref={glowRef} position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.4, mobile ? 12 : 16, mobile ? 12 : 16]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#f59e0b" 
            emissiveIntensity={mobile ? 0.2 : 0.3}
            transparent
            opacity={mobile ? 0.15 : 0.2}
          />
        </mesh>
        
        {/* Engine Bell */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.2, mobile ? 12 : 16]} />
          <meshStandardMaterial 
            color="#6b7280" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </>
  )
}

export default Rocket
