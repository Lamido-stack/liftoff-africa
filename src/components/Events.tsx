import React from 'react'

const Events: React.FC = () => {  const events = [
    {
      date: "June 15, 2025",
      title: "Pan-African Space Camp",
      description: "A week-long intensive program where students from across Africa experience life as space explorers, complete with mission simulations and astronaut training."
    },
    {
      date: "July 20, 2025",
      title: "African Space Heritage Day",
      description: "Celebrating Africa's contributions to space science, from ancient astronomy to modern satellite technology, with special presentations and exhibits."
    },
    {
      date: "August 12, 2025",
      title: "Southern Sky Meteor Shower Viewing",
      description: "Join us for an unforgettable night of meteor watching from African skies, telescope observations, and learning about cosmic phenomena."
    },
    {
      date: "September 5, 2025",
      title: "African Space Agencies Forum",
      description: "Students will learn about African space programs and have opportunities to connect with space professionals from across the continent."
    },
    {
      date: "October 10, 2025",
      title: "Future African Mars Mission Workshop",
      description: "Explore how Africa can contribute to Mars exploration through innovative technology, mission planning, and international collaboration."
    }
  ]

  return (
    <section id="events" className="section">
      <div className="container">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-content">
                <div className="event-date">{event.date}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
