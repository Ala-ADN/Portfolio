/**
 * HackathonLayout - Layout for hackathon pages
 * Displays hackathon name, project, awards, and team info
 */
export default function HackathonLayout({ data = {} }) {
  const {
    hackathonName = "Hackathon Name",
    projectName = "Project Name",
    description = "Project description",
    award = null,
    techStack = [],
    teamSize = null,
    date = null,
    github = null,
    demo = null,
  } = data;

  return (
    <div className="layout-hackathon">
      <div className="hackathon-header">
        <div className="hackathon-event">{hackathonName}</div>
        {date && <div className="hackathon-date">{date}</div>}
      </div>

      <h1>{projectName}</h1>

      {award && <div className="hackathon-award">🏆 {award}</div>}

      <div className="hackathon-description">
        <p>{description}</p>
      </div>

      {techStack.length > 0 && (
        <div className="hackathon-tech">
          <strong>Technologies:</strong> <span>{techStack.join(", ")}</span>
        </div>
      )}

      {teamSize && <div className="hackathon-team">Team Size: {teamSize}</div>}

      <div className="hackathon-links">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
