/**
 * SkillsLayout - Layout for skills/tech stack pages
 * Displays skills organized by category with proficiency indicators
 */
export default function SkillsLayout({ data = {} }) {
  const { title = "Skills", categories = [] } = data;

  return (
    <div className="layout-skills">
      <h1>{title}</h1>

      <div className="skills-categories">
        {categories.map((category, index) => (
          <div key={index} className="skills-category">
            <h3 className="skills-category-name">{category.name}</h3>
            <ul className="skills-list">
              {category.skills.map((skill, idx) => (
                <li key={idx} className="skill-item">
                  <span className="skill-name">{skill.name || skill}</span>
                  {skill.proficiency && (
                    <span className="skill-proficiency">
                      {skill.proficiency}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
