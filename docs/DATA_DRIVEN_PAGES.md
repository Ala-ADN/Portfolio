# Data-Driven Page Architecture

## Overview

The book portfolio now uses a **data-driven architecture** that eliminates manual component imports and registration. Pages are defined in a single configuration file and automatically mapped to layout components.

## Architecture Flow

```
src/data/pages.js (Single source of truth)
    ↓
src/utils/layoutRegistry.js (Type → Layout mapping)
    ↓
Book2D.jsx (Renders layouts with data)
    ↓
Layout Components (Reusable templates)
```

## Key Benefits

✅ **Single Touch Page Creation** - Add a page in one place: `pages.js`  
✅ **No Manual Imports** - Layouts are automatically mapped by type  
✅ **Data-Driven** - Import data from files, no hardcoded content  
✅ **Type Safety** - Layout registry ensures correct layout per type  
✅ **Scalable** - Generate pages programmatically from data arrays

## Adding a New Page

### 1. Simple Page (Custom Content)

```javascript
// In src/data/pages.js
{
  id: "my-page",
  type: PAGE_TYPES.GENERIC,
  data: {
    title: "My Page",
    content: (
      <>
        <p>Your content here</p>
      </>
    )
  }
}
```

### 2. Data-Driven Page

```javascript
// In src/data/pages.js
import { myProjects } from "./myProjects";

// Single page
{
  id: "featured-project",
  type: PAGE_TYPES.PROJECT,
  data: myProjects[0]
}

// Or generate multiple pages
...myProjects.map((project, index) => ({
  id: `project-${index}`,
  type: PAGE_TYPES.PROJECT,
  data: project,
}))
```

### 3. Custom Layout

If you need a new layout type:

1. Create layout component in `src/components/layouts/MyLayout.jsx`
2. Add type to `PAGE_TYPES` in `src/utils/constants.js`
3. Register in `src/utils/layoutRegistry.js`:
   ```javascript
   [PAGE_TYPES.MY_TYPE]: MyLayout
   ```
4. Use in `pages.js`:
   ```javascript
   { id: "custom", type: PAGE_TYPES.MY_TYPE, data: {...} }
   ```

## Available Page Types

| Type         | Layout          | Use Case                   |
| ------------ | --------------- | -------------------------- |
| `PREFACE`    | GenericLayout   | Intro pages with narrative |
| `GENERIC`    | GenericLayout   | Flexible content           |
| `PROJECT`    | ProjectLayout   | Project showcases          |
| `HACKATHON`  | HackathonLayout | Hackathon projects         |
| `ABOUT`      | AboutLayout     | Bio/introduction           |
| `SKILLS`     | SkillsLayout    | Skills grid                |
| `EDUCATION`  | TimelineLayout  | Education timeline         |
| `EXPERIENCE` | TimelineLayout  | Work experience            |
| `VOID`       | null            | Empty pages                |

## Migration Notes

### Old Approach ❌

- Manual imports in `Book2D.jsx`
- `COMPONENT_MAP` registry
- Separate page component files
- Three-file touch for new pages

### New Approach ✅

- Single `pages.js` configuration
- Automatic layout mapping
- Data passed directly to layouts
- One-file touch for new pages

### Legacy Compatibility

`PAGE_LIST` in `constants.js` is kept for Book3D compatibility but marked deprecated. Book2D now uses `pages` from `src/data/pages.js`.

## File Structure

```
src/
├── data/
│   ├── pages.js         # ← Single source of truth
│   ├── projects.js      # Data files
│   ├── hackathons.js
│   └── ...
├── utils/
│   ├── constants.js     # Page types, styling configs
│   └── layoutRegistry.js # Type → Layout mapping
└── components/
    ├── Book2D.jsx       # Renders layouts dynamically
    └── layouts/         # Reusable layout templates
        ├── GenericLayout.jsx
        ├── ProjectLayout.jsx
        └── ...
```

## Example: Adding 10 Project Pages

**Before:** 30+ manual edits across 3 files  
**After:** 5 lines in one file

```javascript
// src/data/pages.js
import { projects } from "./projects";

export const pages = [
  // ... other pages
  ...projects.map((project, index) => ({
    id: `project-${index}`,
    type: PAGE_TYPES.PROJECT,
    data: project,
  })),
];
```

Done! 🎉
