/**
 * AboutLayout - Layout for about/bio pages
 * Displays personal information, bio, and interests
 */
export default function AboutLayout({ data = {} }) {
  const {
    title = "About Me",
    bio = "Your bio goes here.",
    interests = [],
    contact = {},
  } = data;

  return (
    <div className="layout-about">
      <h1>{title}</h1>

      <div className="about-bio">
        {Array.isArray(bio) ? (
          bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p>{bio}</p>
        )}
      </div>

      {interests.length > 0 && (
        <div className="about-interests">
          <h3>Interests</h3>
          <ul>
            {interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(contact).length > 0 && (
        <div className="about-contact">
          <h3>Get in Touch</h3>
          <div className="contact-info">
            {contact.email && (
              <div>
                <strong>Email:</strong> {contact.email}
              </div>
            )}
            {contact.linkedin && (
              <div>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile
                </a>
              </div>
            )}
            {contact.github && (
              <div>
                <strong>GitHub:</strong>{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{contact.github.split("/").pop()}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
