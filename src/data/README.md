# Portfolio Data Structure

This directory contains sample data files for your portfolio pages. Each file provides example data structures that you can use as templates for your own content.

## Data Files

### `projects.js`

Contains project data for ProjectLayout pages.

```javascript
{
  title: "Project Name",
  description: "Project description",
  techStack: ["Tech1", "Tech2"],
  link: "https://...",
  github: "https://...",
  year: "2026"
}
```

### `experiences.js`

Contains work experience data for TimelineLayout pages.

```javascript
{
  role: "Job Title",
  company: "Company Name",
  startDate: "Jan 2024",
  endDate: "Present",
  description: "Role description",
  achievements: ["Achievement 1", "Achievement 2"]
}
```

### `education.js`

Contains education data for TimelineLayout pages.

```javascript
{
  degree: "Degree Name",
  institution: "School Name",
  startDate: "2018",
  endDate: "2022",
  description: "Education description",
  achievements: ["Achievement 1", "Achievement 2"]
}
```

### `hackathons.js`

Contains hackathon project data for HackathonLayout pages.

```javascript
{
  hackathonName: "Hackathon Name",
  projectName: "Project Name",
  description: "Project description",
  award: "Award won",
  techStack: ["Tech1", "Tech2"],
  teamSize: 4,
  date: "March 2025",
  github: "https://...",
  demo: "https://..."
}
```

### `skills.js`

Contains skills/tech stack data for SkillsLayout pages.

```javascript
{
  title: "Skills Title",
  categories: [
    {
      name: "Category Name",
      skills: [
        { name: "Skill", proficiency: "Level" },
        "Simple Skill"
      ]
    }
  ]
}
```

### `about.js`

Contains personal/bio data for AboutLayout pages.

```javascript
{
  title: "About Me",
  bio: ["Paragraph 1", "Paragraph 2"],
  interests: ["Interest 1", "Interest 2"],
  contact: {
    email: "email@example.com",
    linkedin: "https://...",
    github: "https://..."
  }
}
```

## Usage

To use this data in your pages:

1. Import the data in your page component:

```javascript
import { sampleProject } from "../../data/projects";
```

2. Pass it to the layout:

```javascript
export default function MyProject({ data, pageConfig }) {
  const pageData = data || sampleProject;
  return <ProjectLayout data={pageData} />;
}
```

3. Or add it directly to PAGE_LIST in constants.js:

```javascript
{
  id: "my-project",
  component: "MyProject",
  type: PAGE_TYPES.PROJECT,
  data: sampleProject,
}
```

## Customization

Feel free to:

- Modify the data structures to fit your needs
- Add new fields as required
- Create additional data files for different content types
- Use JSON files instead of JS if you prefer
