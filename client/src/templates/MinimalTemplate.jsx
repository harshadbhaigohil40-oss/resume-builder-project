/* Minimal Template — Clean, whitespace-focused resume */

const MinimalTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], certifications = [] } = data || {};

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#374151', padding: '48px 52px', fontSize: '13px', lineHeight: '1.7' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '300', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <MinSection title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{exp.position}</span>
                  {exp.company && <span style={{ color: '#6b7280' }}> · {exp.company}</span>}
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p style={{ color: '#4b5563', margin: '6px 0 0 0', fontSize: '12px' }}>{exp.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Education */}
      {education.length > 0 && (
        <MinSection title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                    {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                  </span>
                  {edu.institution && <span style={{ color: '#6b7280' }}> · {edu.institution}</span>}
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}
                </span>
              </div>
              {edu.description && <p style={{ color: '#4b5563', margin: '4px 0 0 0', fontSize: '12px' }}>{edu.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <MinSection title="Skills">
          <p style={{ color: '#4b5563', margin: 0, fontSize: '13px' }}>
            {skills.join('  ·  ')}
          </p>
        </MinSection>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <MinSection title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{proj.name}</span>
              {proj.link && <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '8px' }}>{proj.link}</span>}
              {proj.description && <p style={{ color: '#4b5563', margin: '4px 0 0 0', fontSize: '12px' }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </MinSection>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <MinSection title="Certifications">
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <span style={{ fontWeight: '600', color: '#111827' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#6b7280' }}> · {cert.issuer}</span>}
              </span>
              {cert.date && <span style={{ fontSize: '12px', color: '#9ca3af' }}>{cert.date}</span>}
            </div>
          ))}
        </MinSection>
      )}
    </div>
  );
};

const MinSection = ({ title, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
      {title}
    </h2>
    {children}
  </div>
);

export default MinimalTemplate;
