# Modular Page Type Architecture - Migration Guide

## Overview

The portfolio has been refactored to support modular page types with distinct layouts and styling. This guide explains the new architecture and how to use it.

## Architecture Changes

### 1. Page Type System

**Location:** [src/utils/constants.js](../utils/constants.js)

New exports:

- `PAGE_TYPES`: Enum of available page types (preface, project, hackathon, education, experience, about, skills, generic)
- `PAGE_TYPE_CONFIG`: Styling configuration for each type (colors, fonts, alignment)
- `PAGE_LIST`: Enhanced with `type` and `data` fields

**Example:**

```javascript
{
  id: "my-project",
  component: "MyProject",
  type: PAGE_TYPES.PROJECT,
  data: projectData, // Optional data object
}
```

### 2. Layout Component Library

**Location:** [src/components/layouts/](../components/layouts/)

Six specialized layouts:

- **ProjectLayout**: Project showcases with tech stack, links
- **TimelineLayout**: Experience/education with chronological entries
- **HackathonLayout**: Hackathon projects with awards
- **SkillsLayout**: Skills organized by category
- **AboutLayout**: Personal bio with interests and contact
- **GenericLayout**: Flexible custom content

All layouts accept a `data` prop with type-specific structure.

### 3. Component Props

Pages now receive props:

- `pageConfig`: Full page configuration from PAGE_LIST
- `data`: Page data (from pageConfig.data)
- `type`: Page type

**Example page component:**

```javascript
import ProjectLayout from "../layouts/ProjectLayout";
import { sampleProject } from "../../data/projects";

export default function MyProject({ data, pageConfig }) {
  const pageData = data || sampleProject;
  return <ProjectLayout data={pageData} />;
}
```

### 4. Type-Specific Styling

**Location:** [src/styles/book.css](../styles/book.css)

CSS classes automatically applied:

- `.page-type-project`: Blue theme, modern font
- `.page-type-hackathon`: Orange theme, energetic
- `.page-type-education`: Purple theme, academic
- `.page-type-experience`: Green theme, professional
- `.page-type-about`: Pink theme, personal
- `.page-type-skills`: Blue theme, organized
- `.page-type-preface`: Classic book style
- `.page-type-generic`: Flexible default

Each type includes:

- Background color
- Accent color
- Font family
- Title alignment
- Layout-specific styles

### 5. Data Layer

**Location:** [src/data/](../data/)

Sample data files for each content type:

- `projects.js`: Project data
- `experiences.js`: Work experience data
- `education.js`: Education history
- `hackathons.js`: Hackathon projects
- `skills.js`: Technical skills
- `about.js`: Personal information

## Creating New Pages

### Using the Enhanced Script

```bash
npm run create-page MyPageName
```

The script now:

1. Prompts for page type selection (1-8)
2. Generates page with appropriate layout
3. Adds entry to PAGE_LIST with type
4. Updates imports in Book2D.jsx

### Manual Creation

1. **Create page component:**

```javascript
import ProjectLayout from "../layouts/ProjectLayout";

export default function MyProject({ data, pageConfig }) {
  const pageData = data || {
    title: "My Project",
    description: "Description",
    techStack: ["React", "Node.js"],
  };

  return <ProjectLayout data={pageData} />;
}
```

2. **Add to PAGE_LIST:**

```javascript
{
  id: "my-project",
  component: "MyProject",
  type: PAGE_TYPES.PROJECT,
  data: null, // or import actual data
}
```

3. **Update Book2D.jsx:**

```javascript
import MyProject from "./pages/MyProject";

const COMPONENT_MAP = {
  // ...
  MyProject,
};
```

## Migration Examples

### Before (Old Generic Page):

```javascript
export default function Education() {
  return (
    <>
      <h1>Education</h1>
      <p>Lorem ipsum...</p>
    </>
  );
}
```

### After (Typed with Layout):

```javascript
import TimelineLayout from "../layouts/TimelineLayout";
import { education } from "../../data/education";

export default function Education({ data, pageConfig }) {
  const pageData = data || {
    title: "Education",
    entries: education,
  };

  return <TimelineLayout data={pageData} />;
}
```

## Benefits

1. **Consistency**: Layouts ensure uniform structure across similar pages
2. **Maintainability**: Update layouts once, affect all pages of that type
3. **Flexibility**: Mix and match layouts, create custom ones
4. **Styling**: Automatic type-specific theming
5. **Data-Driven**: Separate content from presentation
6. **Scalability**: Easy to add new types and layouts

## Customization

### Add New Page Type

1. Add to `PAGE_TYPES` in constants.js
2. Add configuration to `PAGE_TYPE_CONFIG`
3. Create layout component (optional)
4. Add CSS styles for `.page-type-yourtype`
5. Update `TYPE_TO_LAYOUT` in create-page.js

### Modify Existing Layout

Edit layout component in `src/components/layouts/`. Changes apply to all pages using that layout.

### Custom Styling

Add type-specific CSS in book.css or override in page component with inline styles/className.

## Best Practices

1. **Use layouts**: Prefer existing layouts over custom JSX
2. **Externalize data**: Store content in src/data/ files
3. **Type consistency**: Use PAGE_TYPES constants, not strings
4. **Props over hardcoding**: Pass data via props for reusability
5. **Single responsibility**: One layout per concern (timeline vs grid vs narrative)

## Troubleshooting

**Props not received:**

- Ensure Book2D passes `pageConfig`, `data`, `type`
- Check component signature accepts props

**Styling not applied:**

- Verify `type` field in PAGE_LIST uses PAGE_TYPES constant
- Check CSS class naming matches `page-type-{type}`

**Layout not found:**

- Import layout in page component
- Check layout file exists in src/components/layouts/

## Future Enhancements

Potential additions:

- Page filtering/navigation by type
- Table of contents
- Search functionality
- Dynamic page loading
- Animation transitions between types
- Multi-column layouts for certain types
