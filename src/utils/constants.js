// Book dimensions based on 1.71:2 ratio (width:height)
export const BOOK = {
  VIEWPORT: {
    width: 1200,
    height: 675,
  },
  PAGE: {
    width: 513,
    height: 600,
    padding: 45,
  },
  GAP: 0,
  CANVAS_WIDTH: 1026, // 513*2
  CANVAS_HEIGHT: 600,
};

// Page types - define different layouts and styles
export const PAGE_TYPES = {
  VOID: "void",
  PREFACE: "preface",
  PROJECT: "project",
  HACKATHON: "hackathon",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  ABOUT: "about",
  SKILLS: "skills",
  GENERIC: "generic",
};

// Page type configurations - styling and layout settings per type
export const PAGE_TYPE_CONFIG = {
  [PAGE_TYPES.VOID]: {
    backgroundColor: "transparent",
    accentColor: "transparent",
    fontFamily: "inherit",
    titleAlignment: "left",
  },
  [PAGE_TYPES.PREFACE]: {
    backgroundColor: "#f5f5dc",
    accentColor: "#8b4513",
    fontFamily: "Crimson Text, serif",
    titleAlignment: "center",
  },
  [PAGE_TYPES.PROJECT]: {
    backgroundColor: "#e8f4f8",
    accentColor: "#0066cc",
    fontFamily: "Inter, sans-serif",
    titleAlignment: "left",
  },
  [PAGE_TYPES.HACKATHON]: {
    backgroundColor: "#fff3e0",
    accentColor: "#ff6f00",
    fontFamily: "Inter, sans-serif",
    titleAlignment: "left",
  },
  [PAGE_TYPES.EDUCATION]: {
    backgroundColor: "#f3e5f5",
    accentColor: "#6a1b9a",
    fontFamily: "Inter, sans-serif",
    titleAlignment: "left",
  },
  [PAGE_TYPES.EXPERIENCE]: {
    backgroundColor: "#e8f5e9",
    accentColor: "#2e7d32",
    fontFamily: "Inter, sans-serif",
    titleAlignment: "left",
  },
  [PAGE_TYPES.ABOUT]: {
    backgroundColor: "#fce4ec",
    accentColor: "#c2185b",
    fontFamily: "Crimson Text, serif",
    titleAlignment: "center",
  },
  [PAGE_TYPES.SKILLS]: {
    backgroundColor: "#e3f2fd",
    accentColor: "#1565c0",
    fontFamily: "Inter, sans-serif",
    titleAlignment: "center",
  },
  [PAGE_TYPES.GENERIC]: {
    backgroundColor: "#f5f5dc",
    accentColor: "#333333",
    fontFamily: "Crimson Text, serif",
    titleAlignment: "left",
  },
};

// Void page object - used for out-of-bounds indices
export const VOID_PAGE = {
  id: "void",
  component: "Void",
  type: PAGE_TYPES.VOID,
  data: null,
};

// Page list - automatically generates spreads
// Out-of-bounds indices render as void pages automatically
export const PAGE_LIST = [
  {
    id: "preface",
    component: "Preface",
    type: PAGE_TYPES.PREFACE,
    data: null,
  },
  {
    id: "preface-continued",
    component: "PrefaceContinued",
    type: PAGE_TYPES.PREFACE,
    data: null,
  },
  {
    id: "newpage",
    component: "NewPage",
    type: PAGE_TYPES.GENERIC,
    data: null,
  },
  {
    id: "djo",
    component: "Djo",
    type: PAGE_TYPES.GENERIC,
    data: null,
  },
];
