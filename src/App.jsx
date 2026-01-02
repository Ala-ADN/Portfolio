import { useEffect, useState, useRef, useCallback } from "react";
import Book2D from "./components/Book2D";
import Book3D from "./components/Book3D";
import "./styles/book.css";
import { BOOK } from "./utils/constants";

function App() {
  const [modelData, setModelData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const book3DRef = useRef();

  useEffect(() => {
    // Set CSS custom properties from constants
    const root = document.documentElement;
    root.style.setProperty("--viewport-width", `${BOOK.VIEWPORT.width}px`);
    root.style.setProperty("--viewport-height", `${BOOK.VIEWPORT.height}px`);
    root.style.setProperty("--page-width", `${BOOK.PAGE.width}px`);
    root.style.setProperty("--page-height", `${BOOK.PAGE.height}px`);
    root.style.setProperty("--page-padding", `${BOOK.PAGE.padding}px`);
    root.style.setProperty("--page-gap", `${BOOK.GAP}px`);
    root.style.setProperty("--canvas-width", `${BOOK.CANVAS_WIDTH}px`);
    root.style.setProperty("--canvas-height", `${BOOK.CANVAS_HEIGHT}px`);
  }, []);

  const handleModelLoad = useCallback((data) => {
    console.log("Model loaded in App");
    setModelData(data);
  }, []);

  const handlePageChange = (direction) => {
    console.log("App: Starting animation for direction:", direction);
    setIsAnimating(true);

    // Use imperative API to play animation
    book3DRef.current?.playAnimation(direction, () => {
      console.log("App: Animation complete");
      setIsAnimating(false);
    });
  };

  return (
    <div className="app-container">
      <Book3D
        ref={book3DRef}
        onModelLoad={handleModelLoad}
        visible={isAnimating}
      />
      <Book2D onPageChange={handlePageChange} isAnimating={isAnimating} />
    </div>
  );
}

export default App;
