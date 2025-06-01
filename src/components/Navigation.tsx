import React, { useState, useEffect } from 'react'

const Navigation: React.FC = () => {  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }  }, [isMenuOpen])

  useEffect(() => {
    // Close mobile menu when escape key is pressed
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

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
      <div className="nav-container">        <a 
          href="#home" 
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
        >
          🚀 Liftoff Africa
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
          </span>        </button>        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {isMenuOpen && (
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          )}
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
