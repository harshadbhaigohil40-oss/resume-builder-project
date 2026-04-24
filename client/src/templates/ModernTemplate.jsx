/* Modern Template — Bold, colorful, two-column resume layout */

const ModernTemplate = ({ data }) => {
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
    color: '#1e293b',
    display: 'flex',
    minHeight: '100%',
  };

  return (
    <div style={globalStyle}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', background: 'var(--resume-color, linear-gradient(180deg, #6C63FF 0%, #4F46E5 100%))', color: 'white', padding: `${margin}px 24px` }}>
        {/* Avatar placeholder */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '700' }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            (personalInfo.fullName || 'U')[0]
          )}
        </div>

        <h1 style={{ fontSize: `${fontSize + 9}px`, fontWeight: '800', textAlign: 'center', margin: '0 0 4px 0', lineHeight: '1.2' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>

        {personalInfo.summary && (
          <p style={{ fontSize: `${fontSize - 2}px`, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: '8px', lineHeight: '1.5' }}>
            {personalInfo.summary}
          </p>
        )}

        {/* Contact */}
        <SidebarSection title="Contact" fontSize={fontSize}>
          {personalInfo.email && <SidebarItem label="Email" value={personalInfo.email} fontSize={fontSize} />}
          {personalInfo.phone && <SidebarItem label="Phone" value={personalInfo.phone} fontSize={fontSize} />}
          {personalInfo.address && <SidebarItem label="Location" value={personalInfo.address} fontSize={fontSize} />}
          {personalInfo.linkedin && <SidebarItem label="LinkedIn" value={personalInfo.linkedin} fontSize={fontSize} />}
          {personalInfo.github && <SidebarItem label="GitHub" value={personalInfo.github} fontSize={fontSize} />}
          {personalInfo.website && <SidebarItem label="Website" value={personalInfo.website} fontSize={fontSize} />}
        </SidebarSection>

        {/* Languages */}
        {languages.length > 0 && (
          <SidebarSection title="Languages" fontSize={fontSize}>
            {languages.map((lang, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <p style={{ fontSize: `${fontSize - 1}px`, fontWeight: '600', margin: 0 }}>{lang.name}</p>
                <p style={{ fontSize: `${fontSize - 2}px`, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{lang.level}</p>
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <SidebarSection title="Skills" fontSize={fontSize}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ padding: '3px 10px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '999px', fontSize: `${fontSize - 2}px`, fontWeight: '500' }}>
                  {skill}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SidebarSection title="Certifications" fontSize={fontSize}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <p style={{ fontWeight: '600', fontSize: `${fontSize - 1}px`, margin: 0 }}>{cert.name}</p>
                <p style={{ fontSize: `${fontSize - 2}px`, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                </p>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: `${margin}px 32px` }}>
        {/* Experience */}
        {experience.length > 0 && (
          <MainSection title="Work Experience" color="var(--resume-color, #6C63FF)" fontSize={fontSize}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '18px', paddingLeft: '16px', borderLeft: '3px solid var(--resume-color, #6C63FF)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: `${fontSize + 2}px`, fontWeight: '700', color: '#1e293b', margin: 0 }}>{exp.position || 'Position'}</h3>
                  <span style={{ fontSize: `${fontSize - 2}px`, color: '#94a3b8', fontWeight: '500' }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: `${fontSize}px`, color: 'var(--resume-color, #6C63FF)', fontWeight: '600', margin: '2px 0 6px 0' }}>{exp.company}</p>
                {exp.description && <p style={{ color: '#475569', margin: 0, fontSize: `${fontSize - 1}px` }}>{exp.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <MainSection title="Education" color="var(--resume-color, #6C63FF)" fontSize={fontSize}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '16px', borderLeft: '3px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#1e293b', margin: 0 }}>
                    {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                  </h3>
                  <span style={{ fontSize: `${fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}</span>
                </div>
                <p style={{ fontSize: `${fontSize}px`, color: 'var(--resume-color, #6C63FF)', fontWeight: '500', margin: '2px 0' }}>{edu.institution}</p>
                {edu.description && <p style={{ color: '#475569', margin: 0, fontSize: `${fontSize - 1}px` }}>{edu.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <MainSection title="Awards & Honors" color="var(--resume-color, #6C63FF)" fontSize={fontSize}>
            {awards.map((award, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#1e293b', margin: 0 }}>{award.title}</h3>
                  <span style={{ fontSize: `${fontSize - 2}px`, color: '#94a3b8' }}>{award.date}</span>
                </div>
                <p style={{ fontSize: `${fontSize}px`, color: 'var(--resume-color, #6C63FF)', fontWeight: '500', margin: '2px 0' }}>{award.issuer}</p>
                {award.description && <p style={{ color: '#475569', margin: 0, fontSize: `${fontSize - 1}px` }}>{award.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Custom Sections */}
        {customSections.map((section, i) => (
          <MainSection key={i} title={section.title || 'Custom'} color="var(--resume-color, #6C63FF)" fontSize={fontSize}>
            {section.items?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                {item.title && <h3 style={{ fontSize: `${fontSize + 1}px`, fontWeight: '600', color: '#1e293b', margin: '0 0 2px 0' }}>{item.title}</h3>}
                {item.content && <p style={{ color: '#475569', margin: 0, fontSize: `${fontSize - 1}px` }}>{item.content}</p>}
              </div>
            ))}
          </MainSection>
        ))}
      </div>
    </div>
  );
};

const SidebarSection = ({ title, fontSize, children }) => (
  <div style={{ marginTop: '24px' }}>
    <h2 style={{ fontSize: `${fontSize - 1}px`, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
      {title}
    </h2>
    {children}
  </div>
);

const SidebarItem = ({ label, value, fontSize }) => (
  <div style={{ marginBottom: '6px' }}>
    <p style={{ fontSize: `${fontSize - 3}px`, color: 'rgba(255,255,255,0.6)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
    <p style={{ fontSize: `${fontSize - 1}px`, margin: 0, wordBreak: 'break-all' }}>{value}</p>
  </div>
);

const MainSection = ({ title, color, fontSize, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{ fontSize: `${fontSize + 3}px`, fontWeight: '800', color: color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '20px', height: '3px', backgroundColor: color, borderRadius: '2px', display: 'inline-block' }} />
      {title}
    </h2>
    {children}
  </div>
);

export default ModernTemplate;
