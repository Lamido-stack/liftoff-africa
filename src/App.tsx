import { Suspense, useRef, useState, useEffect } from 'react'
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

// Detect mobile device
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768
}

// Camera animation component for subtle movement
const AnimatedCamera = () => {
  const controlsRef = useRef<any>(null)
  const [mobile, setMobile] = useState(false)
  
  useEffect(() => {
    setMobile(isMobile())
  }, [])
  
  useFrame((state) => {
    if (controlsRef.current) {
      // Reduced camera movement on mobile for better performance
      const time = state.clock.elapsedTime
      const intensity = mobile ? 0.1 : 0.3
      const speed = mobile ? 0.05 : 0.1
      
      controlsRef.current.object.position.x = 4 + Math.sin(time * speed) * intensity
      controlsRef.current.object.position.y = 1 + Math.cos(time * (speed * 1.5)) * (intensity * 0.7)
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
      dampingFactor={mobile ? 0.1 : 0.05}
    />
  )
}

function App() {
  const [mobile, setMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <div className="app">
      <Navigation />
      
      {/* Hero Section with 3D Rocket */}
      <section id="home" className="hero-section">
        {/* Rocket Canvas as Background */}
        <div className="rocket-canvas">
          <Canvas 
            camera={{ 
              position: mobile ? [2, 0.5, 3] : [4, 1, 6], 
              fov: mobile ? 65 : 50 
            }}
            performance={{ 
              min: mobile ? 0.8 : 0.5,
              max: mobile ? 0.9 : 1,
              debounce: mobile ? 200 : 100
            }}
            dpr={mobile ? [1, 1.5] : [1, 2]}
            shadows={!mobile}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={mobile ? 0.2 : 0.3} />
              <pointLight 
                position={[10, 10, 10]} 
                intensity={mobile ? 0.6 : 0.8} 
              />
              <pointLight 
                position={[-10, -10, -5]} 
                intensity={mobile ? 0.15 : 0.25} 
                color="#64ffda" 
              />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={mobile ? 0.3 : 0.5} 
                color="#ffffff" 
              />
              <Stars 
                radius={100} 
                depth={50} 
                count={mobile ? 1500 : 4000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={mobile ? 0.3 : 0.8} 
              />
              <group position={mobile ? [0.5, -0.5, 0] : [1.5, 0, 0]}>
                <Rocket />
              </group>
              <AnimatedCamera />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Hero Content on Top */}
        <div className="hero-content">
          <Hero />
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
