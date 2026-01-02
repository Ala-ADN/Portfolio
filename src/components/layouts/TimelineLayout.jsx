/**
 * TimelineLayout - Layout for experience/education pages
 * Displays chronological entries with dates, titles, and descriptions
 */
export default function TimelineLayout({ data = {} }) {
  const { title = "Timeline", entries = [] } = data;

  return (
    <div className="layout-timeline">
      <h1>{title}</h1>

      <div className="timeline-entries">
        {entries.map((entry, index) => (
          <div key={index} className="timeline-entry">
            <div className="timeline-date">
              {entry.startDate}
              {entry.endDate && ` - ${entry.endDate}`}
            </div>
            <div className="timeline-content">
              <h3 className="timeline-role">{entry.role || entry.degree}</h3>
              {entry.company && (
                <div className="timeline-company">{entry.company}</div>
              )}
              {entry.institution && (
                <div className="timeline-institution">{entry.institution}</div>
              )}
              {entry.description && (
                <p className="timeline-description">{entry.description}</p>
              )}
              {entry.achievements && entry.achievements.length > 0 && (
                <ul className="timeline-achievements">
                  {entry.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
