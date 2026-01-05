import { useState, useEffect } from "react";
import PageSpread from "./PageSpread";
import { PAGE_TYPES } from "../utils/constants";
import { pages } from "./pages";
import { getLayoutForType } from "../utils/layoutRegistry";

export default function Book2D({ onPageChange, isAnimating }) {
  // Track the index of the LEFT page (right page is currentPageIndex + 1)
  // Start at -1 so first page appears on the right with void on left
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);

  // Render a page based on its index
  const renderPage = (index) => {
    // Out of bounds = void page (empty)
    if (index < 0 || index >= pages.length) {
      return null;
    }

    const pageConfig = pages[index];
    const LayoutComponent = getLayoutForType(pageConfig.type);

    // If no layout component (like VOID type), render nothing
    if (!LayoutComponent) {
      return null;
    }

    // Render the layout with page data
    return (
      <LayoutComponent key={`${pageConfig.id}-${index}`} {...pageConfig.data} />
    );
  };

  // Get page configuration for styling
  const getPageConfig = (index) => {
    if (index < 0 || index >= pages.length) {
      return { id: "void", type: PAGE_TYPES.VOID };
    }
    return pages[index];
  };

  const handlePrev = () => {
    if (currentPageIndex > -1 && !isAnimating) {
      const newIndex = currentPageIndex - 1;
      onPageChange?.("prev");
      // Small delay for model to show
      setTimeout(() => {
        setCurrentPageIndex(newIndex);
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentPageIndex + 1 < pages.length && !isAnimating) {
      const newIndex = currentPageIndex + 1;
      onPageChange?.("next");
      // Small delay for model to show
      setTimeout(() => {
        setCurrentPageIndex(newIndex);
      }, 400);
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
