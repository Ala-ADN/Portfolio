export default function PageSpread({
  leftPage,
  rightPage,
  leftConfig,
  rightConfig,
}) {
  // Check if a page is void by type
  const isLeftVoid = leftConfig?.type === "void";
  const isRightVoid = rightConfig?.type === "void";

  // Get page type classes
  const leftTypeClass = leftConfig?.type ? `page-type-${leftConfig.type}` : "";
  const rightTypeClass = rightConfig?.type
    ? `page-type-${rightConfig.type}`
    : "";

  return (
    <div className="page-spread">
      <div
        className={`page page-left ${
          isLeftVoid ? "page-void" : ""
        } ${leftTypeClass}`.trim()}
        data-page-type={leftConfig?.type || "void"}
      >
        {leftPage}
      </div>
      <div className="page-gap" />
      <div
        className={`page page-right ${
          isRightVoid ? "page-void" : ""
        } ${rightTypeClass}`.trim()}
        data-page-type={rightConfig?.type || "void"}
      >
        {rightPage}
      </div>
    </div>
  );
}
