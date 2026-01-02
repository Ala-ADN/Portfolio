/**
 * ProjectLayout - Layout for project pages
 * Displays project title, description, tech stack, and links
 */
export default function ProjectLayout({ data = {} }) {
  const {
    title = "Project Title",
    description = "Project description goes here.",
    techStack = [],
    link = null,
    github = null,
    year = null,
  } = data;

  return (
    <div className="layout-project">
      <header className="project-header">
        <h1>{title}</h1>
        {year && <span className="project-year">{year}</span>}
      </header>

      <div className="project-description">
        <p>{description}</p>
      </div>

      {techStack.length > 0 && (
        <div className="project-tech">
          <h3>Tech Stack</h3>
          <ul className="tech-list">
            {techStack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="project-links">
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
