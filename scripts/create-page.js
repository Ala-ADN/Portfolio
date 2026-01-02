#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available page types
const PAGE_TYPES = {
  PREFACE: "preface",
  PROJECT: "project",
  HACKATHON: "hackathon",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  ABOUT: "about",
  SKILLS: "skills",
  GENERIC: "generic",
};

// Layout map - which layout to use for each type
const TYPE_TO_LAYOUT = {
  [PAGE_TYPES.PROJECT]: "ProjectLayout",
  [PAGE_TYPES.HACKATHON]: "HackathonLayout",
  [PAGE_TYPES.EDUCATION]: "TimelineLayout",
  [PAGE_TYPES.EXPERIENCE]: "TimelineLayout",
  [PAGE_TYPES.ABOUT]: "AboutLayout",
  [PAGE_TYPES.SKILLS]: "SkillsLayout",
  [PAGE_TYPES.GENERIC]: "GenericLayout",
  [PAGE_TYPES.PREFACE]: "GenericLayout",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Get page name from command line arguments
const pageName = process.argv[2];

if (!pageName) {
  console.error("❌ Error: Please provide a page name");
  console.log("Usage: npm run create-page <PageName>");
  console.log("Example: npm run create-page Education");
  process.exit(1);
}

// Validate page name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(pageName)) {
  console.error(
    "❌ Error: Page name must be in PascalCase (e.g., Education, TechStack)"
  );
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, "..");
const pagesDir = path.join(projectRoot, "src", "components", "pages");
const constantsPath = path.join(projectRoot, "src", "utils", "constants.js");
const book2DPath = path.join(projectRoot, "src", "components", "Book2D.jsx");

// Interactive page type selection
async function selectPageType() {
  console.log("\n📖 Select page type:");
  console.log("1. Preface/Intro");
  console.log("2. Project");
  console.log("3. Hackathon");
  console.log("4. Education");
  console.log("5. Experience");
  console.log("6. About Me");
  console.log("7. Skills/Tech Stack");
  console.log("8. Generic (custom content)");

  const choice = await question(
    "\nEnter number (1-8) or press Enter for generic: "
  );
  rl.close();

  const typeMap = {
    1: PAGE_TYPES.PREFACE,
    2: PAGE_TYPES.PROJECT,
    3: PAGE_TYPES.HACKATHON,
    4: PAGE_TYPES.EDUCATION,
    5: PAGE_TYPES.EXPERIENCE,
    6: PAGE_TYPES.ABOUT,
    7: PAGE_TYPES.SKILLS,
    8: PAGE_TYPES.GENERIC,
    "": PAGE_TYPES.GENERIC,
  };

  const selectedType = typeMap[choice.trim()];
  if (!selectedType) {
    console.error("❌ Invalid choice. Using generic type.");
    return PAGE_TYPES.GENERIC;
  }

  return selectedType;
}

// Generate page template based on type
function generatePageTemplate(pageName, pageType, layoutName) {
  if (layoutName === "GenericLayout") {
    return `export default function ${pageName}() {
  return (
    <>
      <h1>${pageName}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </>
  );
}
`;
  }

  return `import ${layoutName} from "../layouts/${layoutName}";

export default function ${pageName}({ data, pageConfig }) {
  // TODO: Replace with actual data
  const pageData = data || {
    title: "${pageName}",
    // Add your data properties here based on the layout
  };

  return <${layoutName} data={pageData} />;
}
`;
}

// Main execution
(async () => {
  const pageType = await selectPageType();
  const layoutName = TYPE_TO_LAYOUT[pageType];

  console.log(`\n✨ Creating ${pageType} page: ${pageName}`);
  console.log(`📐 Using layout: ${layoutName}\n`);

  // Create page component file
  const pageFilePath = path.join(pagesDir, `${pageName}.jsx`);

  if (fs.existsSync(pageFilePath)) {
    console.error(`❌ Error: Page "${pageName}.jsx" already exists`);
    process.exit(1);
  }

  const pageTemplate = generatePageTemplate(pageName, pageType, layoutName);

  // Write page file
  fs.writeFileSync(pageFilePath, pageTemplate, "utf-8");
  console.log(`✅ Created page component: ${pageFilePath}`);

  // Update constants.js - add to PAGE_LIST
  let constantsContent = fs.readFileSync(constantsPath, "utf-8");
  const pageListRegex = /export const PAGE_LIST = \[([\s\S]*?)\];/;
  const match = constantsContent.match(pageListRegex);

  if (match) {
    const currentList = match[1];
    const lines = currentList.split("\n");

    // Find the line with void-end to insert before it
    let insertIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("void-end")) {
        insertIndex = i;
        break;
      }
    }

    // If void-end found, insert before it, otherwise append
    const newEntry = `  { id: "${pageName.toLowerCase()}", component: "${pageName}" },`;
    if (insertIndex !== -1) {
      lines.splice(insertIndex, 0, newEntry);
    } else {
      // Add before the last line (which should be empty or just closing bracket)
      const lastNonEmpty = lines.findLastIndex(
        (line) => line.trim() && line.trim() !== "]"
      );
      lines.splice(lastNonEmpty + 1, 0, newEntry);
    }

    const newPageList = `e
    id: "${pageName.toLowerCase()}", 
    component: "${pageName}",
    type: PAGE_TYPES.${pageType.toUpperCase()},
    data: null,
  },`;

    constantsContent = constantsContent.replace(pageListRegex, newPageList);

    fs.writeFileSync(constantsPath, constantsContent, "utf-8");
    console.log(`✅ Added "${pageName}" to PAGE_LIST in constants.js`);
  } else {
    console.warn("⚠️  Warning: Could not find PAGE_LIST in constants.js");
  }

  // Update Book2D.jsx - add import and component map entry
  let book2DContent = fs.readFileSync(book2DPath, "utf-8");

  // Add import - find the last page import and add after it
  const pageImportRegex = /import\s+\w+\s+from\s+["']\.\/pages\/\w+["'];?/g;
  const imports = book2DContent.match(pageImportRegex);
  const newImport = `import ${pageName} from "./pages/${pageName}";`;

  if (imports && !book2DContent.includes(newImport)) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex =
      book2DContent.indexOf(lastImport) + lastImport.length;
    book2DContent =
      book2DContent.slice(0, lastImportIndex) +
      "\n" +
      newImport +
      book2DContent.slice(lastImportIndex);
    console.log(`✅ Added import for ${pageName} in Book2D.jsx`);
  }

  // Add to COMPONENT_MAP - properly handle the object syntax
  const componentMapRegex = /const COMPONENT_MAP = \{([^}]*)\};/;
  const mapMatch = book2DContent.match(componentMapRegex);

  if (mapMatch && !mapMatch[1].includes(pageName)) {
    const currentMap = mapMatch[1];
    // Remove trailing comma/whitespace and add new entry with proper formatting
    const cleanMap = currentMap.trim().replace(/,\s*$/, "");
    const newMap = `const COMPONENT_MAP = {${
      cleanMap ? "\n" + cleanMap + ",\n" : "\n"
    }  ${pageName},\n};`;
    book2DContent = book2DContent.replace(componentMapRegex, newMap);
    console.log(`✅ Added ${pageName} to COMPONENT_MAP in Book2D.jsx`);
  }

  fs.writeFileSync(book2DPath, book2DContent, "utf-8");

  console.log("\n🎉 Page creation complete!");
})();
