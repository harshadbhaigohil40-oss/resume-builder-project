import React from 'react';

const StylishTemplate = ({ data = {} }) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = data;

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-wider mb-2">
            {personalInfo?.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-indigo-100 font-medium tracking-widest uppercase text-sm mb-4">
            {experience?.[0]?.position || 'Professional Title'}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-light opacity-90">
            {personalInfo?.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
            {personalInfo?.phone && <span className="flex items-center gap-1">☏ {personalInfo.phone}</span>}
            {personalInfo?.address && <span className="flex items-center gap-1">📍 {personalInfo.address}</span>}
            {personalInfo?.linkedin && <span className="flex items-center gap-1">in/ {personalInfo.linkedin}</span>}
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
      </header>

      {/* Main Content (2 Columns) */}
      <div className="flex flex-1">
        {/* Left Column (Sidebar) */}
        <aside className="w-1/3 bg-slate-100 p-6 border-r border-slate-200">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">
                About Me
              </h2>
              <p className="text-xs leading-relaxed text-slate-600">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-1 rounded-md shadow-sm font-medium"
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-500 font-medium mb-1">
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-[10px] text-slate-600">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column (Main) */}
        <main className="w-2/3 p-6 bg-white">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">💼</span>
                Experience
              </h2>
              <div className="flex flex-col gap-6 relative border-l-2 border-slate-100 ml-3 pl-4">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 ring-4 ring-white"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-purple-600 mb-2">{exp.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">🚀</span>
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-bold text-slate-800">{project.name}</h3>
                      {project.link && (
                        <a href={project.link} className="text-[10px] text-indigo-500 hover:underline">View Link</a>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-600 mb-2">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-[8px] uppercase tracking-wider bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default StylishTemplate;
