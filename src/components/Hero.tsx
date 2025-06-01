import React from 'react'

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="hero-content">
      <h1 className="hero-title">
        Inspiring Africa's Next Generation of Space Explorers
      </h1>
      <p className="hero-subtitle">
        Join Liftoff Africa on an incredible journey through the cosmos! Our space education programs 
        ignite curiosity, foster scientific thinking, and prepare young minds across Africa for the 
        challenges of tomorrow's space exploration.
      </p>
      <button className="cta-button" onClick={scrollToAbout}>
        Explore Our Mission
      </button>
    </div>
  )
}

export default Hero
