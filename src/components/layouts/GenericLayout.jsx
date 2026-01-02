/**
 * GenericLayout - Flexible layout for custom content
 * Renders children or data content flexibly
 */
export default function GenericLayout({ data = {}, children }) {
  const { title = null, content = null } = data;

  // If children provided, render them
  if (children) {
    return <div className="layout-generic">{children}</div>;
  }

  // Otherwise render from data
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
