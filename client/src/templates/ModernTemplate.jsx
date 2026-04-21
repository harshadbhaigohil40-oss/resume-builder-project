/* Modern Template — Bold, colorful, two-column resume layout */

const ModernTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], certifications = [] } = data || {};

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#1e293b', fontSize: '13px', lineHeight: '1.6', display: 'flex', minHeight: '100%' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', background: 'linear-gradient(180deg, #6C63FF 0%, #4F46E5 100%)', color: 'white', padding: '36px 24px' }}>
        {/* Avatar placeholder */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '700' }}>
          {(personalInfo.fullName || 'U')[0]}
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', margin: '0 0 4px 0', lineHeight: '1.2' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>

        {personalInfo.summary && (
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: '8px', lineHeight: '1.5' }}>
            {personalInfo.summary}
          </p>
        )}

        {/* Contact */}
        <SidebarSection title="Contact">
          {personalInfo.email && <SidebarItem label="Email" value={personalInfo.email} />}
          {personalInfo.phone && <SidebarItem label="Phone" value={personalInfo.phone} />}
          {personalInfo.address && <SidebarItem label="Location" value={personalInfo.address} />}
          {personalInfo.linkedin && <SidebarItem label="LinkedIn" value={personalInfo.linkedin} />}
          {personalInfo.github && <SidebarItem label="GitHub" value={personalInfo.github} />}
          {personalInfo.website && <SidebarItem label="Website" value={personalInfo.website} />}
        </SidebarSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SidebarSection title="Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ padding: '3px 10px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '999px', fontSize: '11px', fontWeight: '500' }}>
                  {skill}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SidebarSection title="Certifications">
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <p style={{ fontWeight: '600', fontSize: '12px', margin: 0 }}>{cert.name}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                </p>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: '36px 32px' }}>
        {/* Experience */}
        {experience.length > 0 && (
          <MainSection title="Work Experience" color="#6C63FF">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '18px', paddingLeft: '16px', borderLeft: '3px solid #6C63FF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{exp.position || 'Position'}</h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6C63FF', fontWeight: '600', margin: '2px 0 6px 0' }}>{exp.company}</p>
                {exp.description && <p style={{ color: '#475569', margin: 0, fontSize: '12px' }}>{exp.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <MainSection title="Education" color="#6C63FF">
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '16px', borderLeft: '3px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                    {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6C63FF', fontWeight: '500', margin: '2px 0' }}>{edu.institution}</p>
                {edu.description && <p style={{ color: '#475569', margin: 0, fontSize: '12px' }}>{edu.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <MainSection title="Projects" color="#6C63FF">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 2px 0' }}>
                  {proj.name}
                </h3>
                {proj.description && <p style={{ color: '#475569', margin: '0 0 4px 0', fontSize: '12px' }}>{proj.description}</p>}
                {proj.technologies?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.map((tech, j) => (
                      <span key={j} style={{ padding: '2px 8px', backgroundColor: '#f1f5f9', borderRadius: '4px', fontSize: '10px', color: '#6C63FF', fontWeight: '600' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div style={{ marginTop: '24px' }}>
    <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
      {title}
    </h2>
    {children}
  </div>
);

const SidebarItem = ({ label, value }) => (
  <div style={{ marginBottom: '6px' }}>
    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
    <p style={{ fontSize: '12px', margin: 0, wordBreak: 'break-all' }}>{value}</p>
  </div>
);

const MainSection = ({ title, color, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{ fontSize: '16px', fontWeight: '800', color: color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '20px', height: '3px', backgroundColor: color, borderRadius: '2px', display: 'inline-block' }} />
      {title}
    </h2>
    {children}
  </div>
);

export default ModernTemplate;
