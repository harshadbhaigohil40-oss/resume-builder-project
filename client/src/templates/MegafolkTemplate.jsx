import React, { useId } from 'react';

const MegafolkTemplate = ({ data = {} }) => {
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

  const filterId = useId().replace(/:/g, '');
  
  const { typography = {}, layout = {} } = metadata;
  const { fontFamily = "'Inter', sans-serif", fontSize = 13, lineHeight = 1.6 } = typography;
  const { margin = 40 } = layout;

  const globalStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    color: '#000',
    backgroundColor: '#fff',
    padding: `${margin}px`,
    minHeight: '100%',
    position: 'relative',
    filter: `url(#${filterId})`,
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")', // Paper-like texture
  };

  return (
    <div style={globalStyle} className="megafolk-container">
      {/* SVG Filter for "Boiling" Jitter effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} className="print:hidden">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise">
            {/* Animating the SEED creates the jittery frame-by-frame look */}
            <animate 
              attributeName="seed" 
              from="1" to="100" 
              dur="0.8s" 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Remove filter on print for perfect PDF clarity */
        @media print {
          .megafolk-container {
            filter: none !important;
            background-image: none !important;
          }
        }
        
        .megafolk-container * {
          transition: none !important;
        }
        
        .megafolk-border {
          border: 4px solid #000;
          padding: 30px;
          margin-bottom: 40px;
          position: relative;
        }

        .megafolk-border::after {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: -6px;
          bottom: -6px;
          border: 2px solid #000;
          z-index: -1;
          pointer-events: none;
        }

        .megafolk-title {
          font-size: ${fontSize + 32}px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: -2px;
          line-height: 0.9;
        }

        .megafolk-section-title {
          font-size: ${fontSize + 8}px;
          font-weight: 900;
          text-transform: uppercase;
          background: #000;
          color: #fff;
          display: inline-block;
          padding: 6px 16px;
          margin-bottom: 25px;
          transform: rotate(-1deg);
        }

        .megafolk-item {
          margin-bottom: 25px;
          border-bottom: 2px solid #000;
          padding-bottom: 15px;
          position: relative;
        }

        .megafolk-tag {
          display: inline-block;
          border: 2px solid #000;
          padding: 2px 10px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-weight: 800;
          font-size: ${fontSize - 1}px;
          background: #fff;
        }
      `}} />

      {/* Header */}
      <div className="megafolk-border">
        <h1 className="megafolk-title">{personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontWeight: '900', textTransform: 'uppercase' }}>
          {personalInfo.email && <span className="megafolk-tag">✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span className="megafolk-tag">☏ {personalInfo.phone}</span>}
          {personalInfo.address && <span className="megafolk-tag">📍 {personalInfo.address}</span>}
          {personalInfo.website && <span className="megafolk-tag">🌐 {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="megafolk-item" style={{ fontSize: `${fontSize + 3}px`, fontWeight: '600', padding: '10px 0' }}>
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 className="megafolk-section-title">Work Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="megafolk-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: `${fontSize + 2}px` }}>
                <span>{exp.position} // {exp.company}</span>
                <span style={{ background: '#eee', padding: '0 5px' }}>{exp.startDate} — {exp.current ? 'NOW' : exp.endDate}</span>
              </div>
              <p style={{ marginTop: '10px', fontWeight: '500' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 className="megafolk-section-title">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="megafolk-item">
              <div style={{ fontWeight: '900', fontSize: `${fontSize + 2}px` }}>{edu.degree}</div>
              <div style={{ fontWeight: '700' }}>{edu.institution} <span style={{ opacity: 0.5 }}>///</span> {edu.startDate} — {edu.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 className="megafolk-section-title">Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            {skills.map((skill, i) => (
              <span key={i} className="megafolk-tag" style={{ background: i % 2 === 0 ? '#fff' : '#000', color: i % 2 === 0 ? '#000' : '#fff' }}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section, i) => (
        <div key={i} style={{ marginTop: '30px' }}>
          <h2 className="megafolk-section-title" style={{ transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)` }}>
            {section.title || 'Custom'}
          </h2>
          {section.items?.map((item, idx) => (
            <div key={idx} className="megafolk-item">
              <div style={{ fontWeight: '900', fontSize: `${fontSize + 1}px` }}>{item.title}</div>
              <p style={{ fontWeight: '500' }}>{item.content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MegafolkTemplate;
