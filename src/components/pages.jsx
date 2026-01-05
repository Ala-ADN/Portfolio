import { PAGE_TYPES } from "../utils/constants";
import { hackathons } from "../data/hackathons";
import { projects } from "../data/projects";
import { aboutMe } from "../data/about";
import { skills } from "../data/skills";

/**
 * Consolidated page configuration
 * Each page entry defines:
 * - id: unique identifier
 * - type: layout type (maps to a layout component)
 * - data: content data or inline JSX for special pages
 */

export const pages = [
  // Preface - special page with inline content
  {
    id: "preface",
    type: PAGE_TYPES.PREFACE,
    data: {
      title: "Preface",
      content: (
        <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium
          </p>
        </>
      ),
    },
  },

  // Preface Continued
  {
    id: "preface-continued",
    type: PAGE_TYPES.PREFACE,
    data: {
      title: "",
      content: (
        <>
          <p>
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
            quasi architecto beatae vitae dicta sunt explicabo. LOREM IPSUM
            ERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.
          </p>
          <p>
            DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE
            CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT
            CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT
            ANIM ID EST LABORUM.
          </p>
        </>
      ),
    },
  },

  // Generic pages
  {
    id: "newpage",
    type: PAGE_TYPES.GENERIC,
    data: {
      title: "New Page",
      content: (
        <>
          <p>This is a new page with generic content.</p>
          <p>You can add more paragraphs or elements as needed.</p>
        </>
      ),
    },
  },

  {
    id: "djo",
    type: PAGE_TYPES.GENERIC,
    data: {
      title: "Djo",
      content: (
        <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </>
      ),
    },
  },

  // Data-driven pages - uncomment when ready to use
  // About page
  // {
  //   id: "about",
  //   type: PAGE_TYPES.ABOUT,
  //   data: aboutMe,
  // },

  // Skills page
  // {
  //   id: "skills",
  //   type: PAGE_TYPES.SKILLS,
  //   data: skills,
  // },

  // Project pages - automatically generate from projects array
  // ...projects.map((project, index) => ({
  //   id: `project-${index}`,
  //   type: PAGE_TYPES.PROJECT,
  //   data: project,
  // })),

  // Hackathon pages - automatically generate from hackathons array
  // ...hackathons.map((hackathon, index) => ({
  //   id: `hackathon-${index}`,
  //   type: PAGE_TYPES.HACKATHON,
  //   data: hackathon,
  // })),
];
