/* Classic Template — Traditional professional resume layout */

const ClassicTemplate = ({ data }) => {
  const { 
    personalInfo = {}, 
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    certifications = [],
    volunteer = [],
    awards = [],
    languages = [],
    customSections = [],
    metadata = {}
  } = data || {};

  const { typography = {}, layout = {} } = metadata;
  const { fontFamily = 'Inter', fontSize = 13, lineHeight = 1.6 } = typography;
  const { margin = 40 } = layout;

  const globalStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    color: '#1a1a1a',
    padding: `${margin}px ${margin + 8}px`,
  };

  return (
    <div style={globalStyle}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '2px solid var(--resume-color, #2c3e50)', paddingBottom: '20px', marginBottom: '24px' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '3px solid #ecf0f1' }} />
        )}
        <h1 style={{ fontSize: `${fontSize + 15}px`, fontWeight: '700', color: 'var(--resume-color, #2c3e50)', margin: '0 0 6px 0', letterSpacing: '1px', textAlign: 'center' }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: `${fontSize - 1}px`, color: '#555' }}>
          {personalInfo.email && <span><span style={{ color: 'var(--resume-color)' }}>📧</span> {personalInfo.email}</span>}
          {personalInfo.phone && <span><span style={{ color: 'var(--resume-color)' }}>📞</span> {personalInfo.phone}</span>}
          {personalInfo.address && <span><span style={{ color: 'var(--resume-color)' }}>📍</span> {personalInfo.address}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: `${fontSize - 1}px`, color: '#666', marginTop: '6px' }}>
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <Section title="Professional Summary" fontSize={fontSize}>
          <p style={{ color: '#444', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience" fontSize={fontSize}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: `${fontSize + 2}px`, fontWeight: '600', color: '#2c3e50', margin: 0 }}>{exp.position || 'Position'}</h3>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#888' }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: `${fontSize}px`, color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{exp.company}</p>
              {exp.description && <p style={{ color: '#444', margin: 0 }}>{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" fontSize={fontSize}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: `${fontSize + 2}px`, fontWeight: '600', color: '#2c3e50', margin: 0 }}>
                  {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                </h3>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#888' }}>{edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}</span>
              </div>
              <p style={{ fontSize: `${fontSize}px`, color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{edu.institution}</p>
              {edu.description && <p style={{ color: '#444', margin: 0 }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills" fontSize={fontSize}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ padding: '4px 12px', backgroundColor: '#ecf0f1', borderRadius: '4px', fontSize: `${fontSize - 1}px`, color: '#2c3e50', fontWeight: '500' }}>
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects" fontSize={fontSize}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#2c3e50', margin: '0 0 2px 0' }}>
                {proj.name}
                {proj.link && <span style={{ fontSize: `${fontSize - 2}px`, color: '#888', fontWeight: '400' }}> — {proj.link}</span>}
              </h3>
              {proj.description && <p style={{ color: '#444', margin: '0 0 4px 0' }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: `${fontSize - 2}px`, color: '#888' }}>Tech: {proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications" fontSize={fontSize}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong style={{ color: '#2c3e50' }}>{cert.name}</strong>
                {cert.issuer && <span style={{ color: '#666' }}> — {cert.issuer}</span>}
              </span>
              {cert.date && <span style={{ fontSize: `${fontSize - 1}px`, color: '#888' }}>{cert.date}</span>}
            </div>
          ))}
        </Section>
      )}
      
      {/* Volunteer */}
      {volunteer.length > 0 && (
        <Section title="Volunteer Work" fontSize={fontSize}>
          {volunteer.map((vol, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#2c3e50', margin: 0 }}>{vol.position}</h3>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#888' }}>{vol.date}</span>
              </div>
              <p style={{ fontSize: `${fontSize}px`, color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{vol.organization}</p>
              {vol.description && <p style={{ color: '#444', margin: 0 }}>{vol.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <Section title="Awards & Honors" fontSize={fontSize}>
          {awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#2c3e50', margin: 0 }}>{award.title}</h3>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#888' }}>{award.date}</span>
              </div>
              <p style={{ fontSize: `${fontSize}px`, color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{award.issuer}</p>
              {award.description && <p style={{ color: '#444', margin: 0 }}>{award.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages" fontSize={fontSize}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((lang, i) => (
              <div key={i}>
                <strong style={{ color: '#2c3e50' }}>{lang.name}</strong>: <span style={{ color: '#666' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Custom Sections */}
      {customSections.map((section, i) => (
        <Section key={i} title={section.title || 'Custom Section'} fontSize={fontSize}>
          {section.items?.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.title && <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#2c3e50', margin: '0 0 2px 0' }}>{item.title}</h3>}
              {item.content && <p style={{ color: '#444', margin: 0 }}>{item.content}</p>}
            </div>
          ))}
        </Section>
      ))}
    </div>
  );
};

const Section = ({ title, children, fontSize }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{ fontSize: `${fontSize + 3}px`, fontWeight: '700', color: 'var(--resume-color, #2c3e50)', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '2px solid var(--resume-color, #bdc3c7)', paddingBottom: '6px', marginBottom: '12px', opacity: 0.9 }}>
      {title}
    </h2>
    {children}
  </div>
);

export default ClassicTemplate;
