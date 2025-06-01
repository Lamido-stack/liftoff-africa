import React from 'react'

const Navigation: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (      <nav className="navigation">
        <div className="nav-container">          <a href="#home" className="logo">
            🌍🚀 Liftoff Africa
          </a>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
          <li><a href="#programs" onClick={() => scrollToSection('programs')}>Programs</a></li>
          <li><a href="#events" onClick={() => scrollToSection('events')}>Events</a></li>
          <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
