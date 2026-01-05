/**
 * GenericLayout - Flexible layout for custom content
 * Renders children or title/content directly
 */
export default function GenericLayout({
  title = null,
  content = null,
  children,
}) {
  // If children provided, render them
  if (children) {
    return <div className="layout-generic">{children}</div>;
  }

  // Otherwise render from props
  return (
    <div className="layout-generic">
      {title && <h1>{title}</h1>}
      {content && (
        <div className="generic-content">
          {Array.isArray(content) ? (
            content.map((item, index) => {
              if (typeof item === "string") {
                return <p key={index}>{item}</p>;
              }
              return <div key={index}>{item}</div>;
            })
          ) : (
            <div>{content}</div>
          )}
        </div>
      )}
    </div>
  );
}
