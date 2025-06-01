import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import './App.css'
import Rocket from './components/Rocket'
import Hero from './components/Hero'
import About from './components/About'
import Programs from './components/Programs'
import Events from './components/Events'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

// Camera animation component for subtle movement
const AnimatedCamera = () => {
  const controlsRef = useRef<any>(null)
  
  useFrame((state) => {
    if (controlsRef.current) {
      // Subtle camera movement for more dynamic view
      const time = state.clock.elapsedTime
      controlsRef.current.object.position.x = 4 + Math.sin(time * 0.1) * 0.3
      controlsRef.current.object.position.y = 1 + Math.cos(time * 0.15) * 0.2
      controlsRef.current.update()
    }
  })
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enableZoom={false} 
      enablePan={false}
      autoRotate={false}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}

function App() {
  return (
    <div className="app">
      <Navigation />
      
      {/* Hero Section with 3D Rocket */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <Hero />
        </div>
        <div className="rocket-canvas">
          <Canvas camera={{ position: [4, 1, 6], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.3} color="#64ffda" />
              <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <group position={[2, 0, 0]}>
                <Rocket />
              </group>
              <AnimatedCamera />
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Main Content Sections */}
      <About />
      <Programs />
      <Events />
      <Contact />
    </div>
  )
}

export default App
