import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Liftoff Africa</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Liftoff Africa is a non-profit organization dedicated to making space science 
              accessible and exciting for kids and young adults across the African continent. 
              We believe that every child has the potential to reach for the stars, and we're 
              here to provide the tools, knowledge, and inspiration they need.
            </p>
            <p>
              Through hands-on activities, interactive workshops, and immersive experiences, 
              we bring the wonders of space exploration directly to students across Africa. 
              Our programs are designed to spark curiosity, develop critical thinking skills, 
              and encourage the next generation of African scientists, engineers, and space explorers.
            </p>
            <p>
              From building model rockets to understanding planetary science, from coding 
              space missions to exploring the possibilities of life beyond Earth, we make 
              learning about space an adventure that African students will never forget.
            </p>          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Students Reached</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">150+</div>
              <div className="stat-label">African Schools Partnered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Programs Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15</div>
              <div className="stat-label">African Countries Reached</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
