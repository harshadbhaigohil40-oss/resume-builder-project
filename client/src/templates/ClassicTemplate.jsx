/* Classic Template — Traditional professional resume layout */

const ClassicTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], certifications = [] } = data || {};

  return (
    <div style={{ fontFamily: "'Inter', 'Georgia', serif", color: '#1a1a1a', padding: '40px 48px', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '2px solid var(--resume-color, #2c3e50)', paddingBottom: '20px', marginBottom: '24px' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '3px solid #ecf0f1' }} />
        )}
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--resume-color, #2c3e50)', margin: '0 0 6px 0', letterSpacing: '1px', textAlign: 'center' }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#555' }}>
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#666', marginTop: '6px' }}>
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <Section title="Professional Summary">
          <p style={{ color: '#444', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#2c3e50', margin: 0 }}>{exp.position || 'Position'}</h3>
                <span style={{ fontSize: '12px', color: '#888' }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{exp.company}</p>
              {exp.description && <p style={{ color: '#444', margin: 0 }}>{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#2c3e50', margin: 0 }}>
                  {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                </h3>
                <span style={{ fontSize: '12px', color: '#888' }}>{edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#666', fontStyle: 'italic', margin: '2px 0 4px 0' }}>{edu.institution}</p>
              {edu.description && <p style={{ color: '#444', margin: 0 }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ padding: '4px 12px', backgroundColor: '#ecf0f1', borderRadius: '4px', fontSize: '12px', color: '#2c3e50', fontWeight: '500' }}>
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', margin: '0 0 2px 0' }}>
                {proj.name}
                {proj.link && <span style={{ fontSize: '11px', color: '#888', fontWeight: '400' }}> — {proj.link}</span>}
              </h3>
              {proj.description && <p style={{ color: '#444', margin: '0 0 4px 0' }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: '11px', color: '#888' }}>Tech: {proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong style={{ color: '#2c3e50' }}>{cert.name}</strong>
                {cert.issuer && <span style={{ color: '#666' }}> — {cert.issuer}</span>}
              </span>
              {cert.date && <span style={{ fontSize: '12px', color: '#888' }}>{cert.date}</span>}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--resume-color, #2c3e50)', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #bdc3c7', paddingBottom: '6px', marginBottom: '12px' }}>
      {title}
    </h2>
    {children}
  </div>
);

export default ClassicTemplate;
