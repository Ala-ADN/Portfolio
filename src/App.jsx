import { useEffect } from "react";
import Book2D from "./components/Book2D";
import "./styles/book.css";
import { BOOK } from "./utils/constants";

function App() {
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

  return <Book2D />;
}

export default App;
