import React from 'react';

const StylishTemplate = ({ data = {} }) => {
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
  } = data;

  const { typography = {}, layout = {} } = metadata;
  const { fontFamily = 'Inter', fontSize = 13, lineHeight = 1.6 } = typography;
  const { margin = 0 } = layout;

  const globalStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 selection:bg-amber-200" style={globalStyle}>
      {/* Header Section - High Level Executive Design */}
      <header className="bg-slate-900 text-white p-12 relative overflow-hidden" style={{ padding: `${margin + 48}px 48px` }}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            {personalInfo?.photo && (
              <img src={personalInfo.photo} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
            )}
            <div>
              <h1 className="font-display font-black uppercase tracking-tighter mb-1 leading-none" style={{ fontSize: `${fontSize + 32}px` }}>
                {personalInfo?.fullName || 'YOUR NAME'}
              </h1>
              <p className="font-bold tracking-[0.3em] uppercase mb-6" style={{ fontSize: `${fontSize}px`, color: 'var(--resume-color, #f59e0b)' }}>
                {experience?.[0]?.position || 'Professional Title'}
              </p>
              <div className="flex flex-wrap gap-6 text-[11px] font-medium opacity-60 tracking-widest uppercase">
                {personalInfo?.email && <span className="flex items-center gap-2"><span style={{ color: 'var(--resume-color, #f59e0b)' }}>E</span> {personalInfo.email}</span>}
                {personalInfo?.phone && <span className="flex items-center gap-2"><span style={{ color: 'var(--resume-color, #f59e0b)' }}>T</span> {personalInfo.phone}</span>}
                {personalInfo?.address && <span className="flex items-center gap-2"><span style={{ color: 'var(--resume-color, #f59e0b)' }}>L</span> {personalInfo.address}</span>}
              </div>
            </div>
          </div>
          {/* Decorative Monogram */}
          <div className="hidden md:block opacity-10 font-display font-black text-9xl absolute right-12 top-1/2 -translate-y-1/2 select-none">
            {personalInfo?.fullName?.charAt(0) || 'R'}
          </div>
        </div>
      </header>

      {/* Main Content (2 Columns) */}
      <div className="flex flex-1">
        {/* Left Column (Sidebar) */}
        <aside className="w-1/3 bg-slate-100 p-6 border-r border-slate-200" style={{ padding: `24px ${margin + 24}px` }}>
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="font-bold uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)', borderColor: 'var(--resume-color, #6366f1)22' }}>
                About Me
              </h2>
              <p className="leading-relaxed text-slate-600" style={{ fontSize: `${fontSize - 1}px` }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)', borderColor: 'var(--resume-color, #6366f1)22' }}>
                Languages
              </h2>
              <div className="flex flex-col gap-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700" style={{ fontSize: `${fontSize - 1}px` }}>{lang.name}</span>
                    <span className="text-slate-500 italic" style={{ fontSize: `${fontSize - 2}px` }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)', borderColor: 'var(--resume-color, #6366f1)22' }}>
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md shadow-sm font-medium"
                    style={{ fontSize: `${fontSize - 3}px` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="font-bold uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)', borderColor: 'var(--resume-color, #6366f1)22' }}>
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-800" style={{ fontSize: `${fontSize - 1}px` }}>{edu.degree}</h3>
                    <p className="text-slate-500 font-medium mb-1" style={{ fontSize: `${fontSize - 2}px` }}>
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column (Main) */}
        <main className="w-2/3 p-6 bg-white" style={{ padding: `24px ${margin + 24}px` }}>
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--resume-color, #6366f1)22', color: 'var(--resume-color, #6366f1)' }}>💼</span>
                Experience
              </h2>
              <div className="flex flex-col gap-6 relative border-l-2 border-slate-100 ml-3 pl-4">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white" style={{ backgroundColor: 'var(--resume-color, #6366f1)' }}></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800" style={{ fontSize: `${fontSize + 1}px` }}>{exp.position}</h3>
                      <span className="font-semibold px-2 py-0.5 rounded-full" style={{ fontSize: `${fontSize - 3}px`, backgroundColor: 'var(--resume-color, #6366f1)22', color: 'var(--resume-color, #6366f1)' }}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="font-medium mb-2" style={{ fontSize: `${fontSize - 1}px`, color: 'var(--resume-color, #6366f1)' }}>{exp.company}</p>
                    <p className="text-slate-600 leading-relaxed" style={{ fontSize: `${fontSize - 1}px` }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards & Volunteer */}
          {(awards.length > 0 || volunteer.length > 0) && (
            <section className="mb-8 grid grid-cols-1 gap-6">
              {awards.length > 0 && (
                <div>
                  <h2 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--resume-color, #6366f1)22', color: 'var(--resume-color, #6366f1)' }}>🏆</span>
                    Awards
                  </h2>
                  <div className="space-y-4">
                    {awards.map((award, i) => (
                      <div key={i}>
                        <h3 className="font-bold text-slate-800" style={{ fontSize: `${fontSize - 1}px` }}>{award.title}</h3>
                        <p className="text-slate-500" style={{ fontSize: `${fontSize - 2}px` }}>{award.issuer} · {award.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Custom Sections */}
          {customSections.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px`, color: 'var(--resume-color, #6366f1)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--resume-color, #6366f1)22', color: 'var(--resume-color, #6366f1)' }}>◈</span>
                {section.title || 'Custom'}
              </h2>
              <div className="space-y-4">
                {section.items?.map((item, idx) => (
                  <div key={idx}>
                    {item.title && <h3 className="font-bold text-slate-800" style={{ fontSize: `${fontSize - 1}px` }}>{item.title}</h3>}
                    {item.content && <p className="text-slate-600" style={{ fontSize: `${fontSize - 1}px` }}>{item.content}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default StylishTemplate;
