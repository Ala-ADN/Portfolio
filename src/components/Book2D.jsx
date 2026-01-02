import { useState, useEffect } from "react";
import PageSpread from "./pages/PageSpread";
import { PAGE_LIST, VOID_PAGE } from "../utils/constants";

// Dynamically import page components
import Preface from "./pages/Preface";
import PrefaceContinued from "./pages/PrefaceContinued";
import NewPage from "./pages/NewPage";
import Djo from "./pages/Djo";
import Void from "./pages/Void";

// Component registry - maps component names to actual components
const COMPONENT_MAP = {
  Void,
  Preface,
  PrefaceContinued,
  NewPage,
  Djo,
};

export default function Book2D({ onPageChange, isAnimating }) {
  // Track the index of the LEFT page (right page is currentPageIndex + 1)
  // Start at -1 so first page appears on the right with void on left
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [pendingPageChange, setPendingPageChange] = useState(null);

  // Apply pending page change after animation completes
  useEffect(() => {
    if (!isAnimating && pendingPageChange !== null) {
      setCurrentPageIndex(pendingPageChange);
      setPendingPageChange(null);
    }
  }, [isAnimating, pendingPageChange]);

  // Helper function to render a single page
  const renderPage = (index) => {
    const pageConfig =
      index < 0 || index >= PAGE_LIST.length ? VOID_PAGE : PAGE_LIST[index];

    const Component = COMPONENT_MAP[pageConfig.component];
    return Component ? (
      <Component
        key={`${pageConfig.id}-${index}`}
        pageConfig={pageConfig}
        data={pageConfig.data}
        type={pageConfig.type}
      />
    ) : null;
  };

  // Get page configuration
  const getPageConfig = (index) => {
    return index < 0 || index >= PAGE_LIST.length
      ? VOID_PAGE
      : PAGE_LIST[index];
  };

  const handlePrev = () => {
    // Move back by one page (the right page becomes the new left page)
    if (currentPageIndex > -1 && !isAnimating) {
      const newIndex = currentPageIndex - 1;
      setPendingPageChange(newIndex);
      onPageChange?.("prev");
    }
  };

  const handleNext = () => {
    // Move forward by one page (the current right page becomes the new left page)
    if (currentPageIndex + 1 < PAGE_LIST.length && !isAnimating) {
      const newIndex = currentPageIndex + 1;
      setPendingPageChange(newIndex);
      onPageChange?.("next");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPageIndex, isAnimating]);

  return (
    <div className="book-container">
      <PageSpread
        leftPage={renderPage(currentPageIndex)}
        rightPage={renderPage(currentPageIndex + 1)}
        leftConfig={getPageConfig(currentPageIndex)}
        rightConfig={getPageConfig(currentPageIndex + 1)}
      />
    </div>
  );
}
