import React, { useState, useEffect } from 'react'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a 
          href="#home" 
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
        >
          🌍🚀 Liftoff Africa
        </a>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
              <span className="nav-icon">🏠</span> Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>
              <span className="nav-icon">🌟</span> About
            </a>
          </li>
          <li>
            <a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs') }}>
              <span className="nav-icon">🎓</span> Programs
            </a>
          </li>
          <li>
            <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events') }}>
              <span className="nav-icon">📅</span> Events
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
              <span className="nav-icon">📬</span> Contact
            </a>
          </li>
        </ul>

        {isMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  )
}

export default Navigation
