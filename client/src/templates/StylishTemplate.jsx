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
    <div className="flex flex-col h-full bg-slate-50 text-slate-800" style={globalStyle}>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden" style={{ padding: `${margin + 32}px 32px` }}>
        <div className="relative z-10 flex items-center gap-6">
          {personalInfo?.photo && (
            <img src={personalInfo.photo} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-xl" />
          )}
          <div>
            <h1 className="font-black uppercase tracking-wider mb-2" style={{ fontSize: `${fontSize + 19}px` }}>
              {personalInfo?.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-indigo-100 font-medium tracking-widest uppercase mb-4" style={{ fontSize: `${fontSize - 1}px` }}>
              {experience?.[0]?.position || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-light opacity-90">
              {personalInfo?.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
              {personalInfo?.phone && <span className="flex items-center gap-1">☏ {personalInfo.phone}</span>}
              {personalInfo?.address && <span className="flex items-center gap-1">📍 {personalInfo.address}</span>}
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
      </header>

      {/* Main Content (2 Columns) */}
      <div className="flex flex-1">
        {/* Left Column (Sidebar) */}
        <aside className="w-1/3 bg-slate-100 p-6 border-r border-slate-200" style={{ padding: `24px ${margin + 24}px` }}>
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1" style={{ fontSize: `${fontSize + 1}px` }}>
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
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1" style={{ fontSize: `${fontSize + 1}px` }}>
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
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1" style={{ fontSize: `${fontSize + 1}px` }}>
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
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1" style={{ fontSize: `${fontSize + 1}px` }}>
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
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px` }}>
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">💼</span>
                Experience
              </h2>
              <div className="flex flex-col gap-6 relative border-l-2 border-slate-100 ml-3 pl-4">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 ring-4 ring-white"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800" style={{ fontSize: `${fontSize + 1}px` }}>{exp.position}</h3>
                      <span className="font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full" style={{ fontSize: `${fontSize - 3}px` }}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="font-medium text-purple-600 mb-2" style={{ fontSize: `${fontSize - 1}px` }}>{exp.company}</p>
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
                  <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px` }}>
                    <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">🏆</span>
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
              <h2 className="font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2" style={{ fontSize: `${fontSize + 1}px` }}>
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">◈</span>
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
