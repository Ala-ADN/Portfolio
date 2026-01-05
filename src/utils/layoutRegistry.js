import { PAGE_TYPES } from "../utils/constants";
import AboutLayout from "../components/layouts/AboutLayout";
import GenericLayout from "../components/layouts/GenericLayout";
import HackathonLayout from "../components/layouts/HackathonLayout";
import ProjectLayout from "../components/layouts/ProjectLayout";
import SkillsLayout from "../components/layouts/SkillsLayout";
import TimelineLayout from "../components/layouts/TimelineLayout";

/**
 * Layout Registry
 * Maps page types to their corresponding layout components
 * This eliminates the need for manual component imports in Book2D
 */

export const LAYOUT_REGISTRY = {
  [PAGE_TYPES.VOID]: null, // Void pages render nothing
  [PAGE_TYPES.PREFACE]: GenericLayout,
  [PAGE_TYPES.GENERIC]: GenericLayout,
  [PAGE_TYPES.PROJECT]: ProjectLayout,
  [PAGE_TYPES.HACKATHON]: HackathonLayout,
  [PAGE_TYPES.ABOUT]: AboutLayout,
  [PAGE_TYPES.SKILLS]: SkillsLayout,
  [PAGE_TYPES.EDUCATION]: TimelineLayout,
  [PAGE_TYPES.EXPERIENCE]: TimelineLayout,
};

/**
 * Get layout component for a given page type
 * @param {string} type - The page type from PAGE_TYPES
 * @returns {React.Component|null} Layout component or null
 */
export function getLayoutForType(type) {
  return LAYOUT_REGISTRY[type] || GenericLayout;
}
