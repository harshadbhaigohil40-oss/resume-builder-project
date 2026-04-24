/* Minimal Template — Clean, whitespace-focused resume */

const MinimalTemplate = ({ data }) => {
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
  const { fontFamily = 'Inter', fontSize = 13, lineHeight = 1.7 } = typography;
  const { margin = 48 } = layout;

  const globalStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    color: '#374151',
    padding: `${margin}px ${margin + 4}px`,
  };

  return (
    <div style={globalStyle}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: `${fontSize + 19}px`, fontWeight: '300', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: `${fontSize - 1}px`, color: '#6b7280', marginTop: '8px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: `${fontSize - 1}px`, color: '#9ca3af', marginTop: '4px' }}>
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ color: '#4b5563', fontSize: `${fontSize}px`, lineHeight: '1.8', margin: 0 }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <MinSection title="Experience" fontSize={fontSize}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#111827' }}>{exp.position}</span>
                  {exp.company && <span style={{ color: '#6b7280' }}> · {exp.company}</span>}
                </div>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#9ca3af', fontWeight: '500' }}>
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p style={{ color: '#4b5563', margin: '6px 0 0 0', fontSize: `${fontSize - 1}px` }}>{exp.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Education */}
      {education.length > 0 && (
        <MinSection title="Education" fontSize={fontSize}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#111827' }}>
                    {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                  </span>
                  {edu.institution && <span style={{ color: '#6b7280' }}> · {edu.institution}</span>}
                </div>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#9ca3af' }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}
                </span>
              </div>
              {edu.description && <p style={{ color: '#4b5563', margin: '4px 0 0 0', fontSize: `${fontSize - 1}px` }}>{edu.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <MinSection title="Skills" fontSize={fontSize}>
          <p style={{ color: '#4b5563', margin: 0, fontSize: `${fontSize}px` }}>
            {skills.join('  ·  ')}
          </p>
        </MinSection>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <MinSection title="Projects" fontSize={fontSize}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#111827' }}>{proj.name}</span>
              {proj.link && <span style={{ fontSize: `${fontSize - 2}px`, color: '#9ca3af', marginLeft: '8px' }}>{proj.link}</span>}
              {proj.description && <p style={{ color: '#4b5563', margin: '4px 0 0 0', fontSize: `${fontSize - 1}px` }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: `${fontSize - 2}px`, color: '#9ca3af', marginTop: '4px' }}>{proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </MinSection>
      )}

      {/* Volunteer */}
      {volunteer.length > 0 && (
        <MinSection title="Volunteer" fontSize={fontSize}>
          {volunteer.map((vol, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#111827' }}>{vol.position} · {vol.organization}</span>
                <span style={{ fontSize: `${fontSize - 1}px`, color: '#9ca3af' }}>{vol.date}</span>
              </div>
              {vol.description && <p style={{ color: '#4b5563', margin: '4px 0 0 0', fontSize: `${fontSize - 1}px` }}>{vol.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <MinSection title="Awards" fontSize={fontSize}>
          {awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <span style={{ fontWeight: '600', color: '#111827' }}>{award.title}</span>
                {award.issuer && <span style={{ color: '#6b7280' }}> · {award.issuer}</span>}
              </span>
              {award.date && <span style={{ fontSize: `${fontSize - 1}px`, color: '#9ca3af' }}>{award.date}</span>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <MinSection title="Languages" fontSize={fontSize}>
          <p style={{ color: '#4b5563', margin: 0, fontSize: `${fontSize}px` }}>
            {languages.map(l => `${l.name} (${l.level})`).join('  ·  ')}
          </p>
        </MinSection>
      )}

      {/* Custom Sections */}
      {customSections.map((section, i) => (
        <MinSection key={i} title={section.title || 'Custom'} fontSize={fontSize}>
          {section.items?.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.title && <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{item.title}</h3>}
              {item.content && <p style={{ color: '#4b5563', margin: 0, fontSize: `${fontSize - 1}px` }}>{item.content}</p>}
            </div>
          ))}
        </MinSection>
      ))}
    </div>
  );
};

const MinSection = ({ title, fontSize, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{ fontSize: `${fontSize - 2}px`, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
      {title}
    </h2>
    {children}
  </div>
);

export default MinimalTemplate;
