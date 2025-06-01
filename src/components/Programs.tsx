import React from 'react'

const Programs: React.FC = () => {
  const programs = [
    {
      icon: "🚀",
      title: "Rocket Building Workshop",
      description: "Students design, build, and launch their own model rockets while learning about physics, aerodynamics, and propulsion systems."
    },    {
      icon: "🌌",
      title: "African Space Heritage",
      description: "Exploring Africa's contributions to astronomy and space science, from ancient Egyptian star maps to modern African space agencies and satellites."
    },
    {
      icon: "🛰️",
      title: "Satellite Technology for Africa",
      description: "Learning how satellites support African development through weather monitoring, agriculture, telecommunications, and disaster management."
    },
    {
      icon: "👨‍🚀",
      title: "Astronaut Training",
      description: "Experience what it's like to be an astronaut through simulated space missions, zero-gravity experiments, and space suit demonstrations."
    },    {
      icon: "🔭",
      title: "Southern Sky Astronomy",
      description: "Stargazing sessions featuring constellations visible from Africa, including the Southern Cross and learning about African astronomical traditions."
    },
    {
      icon: "🌍",
      title: "Africa from Space",
      description: "Understanding our continent from space, studying African geography, climate patterns, and environmental changes through satellite imagery."
    }
  ]

  return (
    <section id="programs" className="section programs-section">
      <div className="container">
        <h2 className="section-title">Our Programs</h2>
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <div className="program-icon">{program.icon}</div>
              <h3 className="program-title">{program.title}</h3>
              <p className="program-description">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
