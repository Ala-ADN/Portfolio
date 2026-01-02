# Page Management System

## Overview
The book now uses a dynamic page list system that automatically generates spreads from individual pages.

## How It Works

### 1. Page List (constants.js)
All pages are defined in `PAGE_LIST`:
```javascript
export const PAGE_LIST = [
  { id: "void-start", component: "Void", type: "void" },
  { id: "preface", component: "Preface" },
  { id: "preface-continued", component: "PrefaceContinued" },
  { id: "void-end", component: "Void", type: "void" },
];
```

### 2. Automatic Spread Generation
Book2D automatically pairs pages into spreads (2 pages per spread).

### 3. Void Pages
Pages with `type: "void"` render transparently, perfect for book covers.

## Adding New Pages

### Method 1: Using the Script (Recommended)
```bash
npm run create-page <PageName>
```

Example:
```bash
npm run create-page Education
npm run create-page TechStack
```

This will:
- Create `src/components/pages/<PageName>.jsx` with boilerplate
- Add the page to `PAGE_LIST` in constants.js
- Add imports to Book2D.jsx
- Register in COMPONENT_MAP

### Method 2: Manual
1. Create file in `src/components/pages/<PageName>.jsx`
2. Add to `PAGE_LIST` in `src/utils/constants.js`
3. Import in `src/components/Book2D.jsx`
4. Add to `COMPONENT_MAP`

## Page Template
```jsx
export default function MyPage() {
  return (
    <>
      <h1>Title</h1>
      <p>Content here...</p>
    </>
  );
}
```

## Special Page Types
- `type: "void"` - Transparent background, no borders
- Default - Standard parchment background with content styling

## Navigation
- **Arrow Left** (←): Previous spread
- **Arrow Right** (→): Next spread
