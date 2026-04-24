import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const AnimatedTemplate = ({ data = {} }) => {
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
  const { margin = 40 } = layout;

  const globalStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
  };
  
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Main card rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Sub-element parallax
  const headerTranslateZ = 60;
  const sectionTranslateZ = 40;
  const badgeTranslateZ = 20;

  // Parallax movement for elements
  const elementX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const elementY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  // Cursor follow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const pointerXSpring = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const pointerYSpring = useSpring(cursorY, { stiffness: 1000, damping: 40 });
  
  const spotlightXSpring = useSpring(cursorX, { stiffness: 150, damping: 30 });
  const spotlightYSpring = useSpring(cursorY, { stiffness: 150, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    cursorX.set(mouseX);
    cursorY.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      style={{ perspective: 1200, background: '#0f172a', minHeight: '100%', display: 'flex', flexDirection: 'column', cursor: 'none', ...globalStyle }}
      className="print:p-0 print:bg-white w-full h-full relative overflow-hidden"
    >
      {/* Custom Cursor Spotlight */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: spotlightXSpring,
              top: spotlightYSpring,
              translateX: '-50%',
              translateY: '-50%',
              position: 'absolute',
            }}
            className="w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none z-[100] print:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          padding: `${margin}px`
        }}
        className="flex-1 w-full h-full bg-slate-800 shadow-2xl relative overflow-hidden print:shadow-none print:transform-none print:rounded-none print:bg-white print:text-black"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none print:hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Header Section */}
        <motion.header 
          style={{ transform: `translateZ(${headerTranslateZ}px)`, x: elementX, y: elementY }}
          className="relative z-20 border-b border-slate-700 pb-8 mb-8 print:border-slate-300 print:transform-none"
        >
          <div className="flex items-center gap-8 mb-4">
             {personalInfo?.photo && (
               <motion.img 
                 style={{ translateZ: 30 }}
                 src={personalInfo.photo} 
                 className="w-24 h-24 rounded-3xl object-cover border-4 border-indigo-500/30 shadow-2xl" 
               />
             )}
             <div>
               <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: `${fontSize + 24}px` }}
                className="font-black uppercase tracking-[0.2em] mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient print:text-black print:bg-none"
              >
                {personalInfo?.fullName || 'YOUR NAME'}
              </motion.h1>
              <motion.p 
                style={{ translateZ: 20, fontSize: `${fontSize + 1}px` }}
                className="text-indigo-300 font-semibold tracking-[0.3em] uppercase print:text-slate-600"
              >
                {experience?.[0]?.position || 'Professional Title'}
              </motion.p>
             </div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-400 print:text-slate-800">
            {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo?.phone && <span>☏ {personalInfo.phone}</span>}
            {personalInfo?.address && <span>📍 {personalInfo.address}</span>}
            {languages.length > 0 && <span className="text-cyan-400">🌐 {languages.map(l => l.name).join(', ')}</span>}
          </div>
        </motion.header>

        <div className="flex flex-1 gap-12 relative z-10">
          {/* Left Column */}
          <div className="w-1/3 space-y-10">
            {personalInfo?.summary && (
              <AnimatedSection title="About" icon="◈" translateZ={sectionTranslateZ} fontSize={fontSize}>
                <p className="text-slate-300 font-light print:text-slate-700" style={{ fontSize: `${fontSize - 1}px` }}>
                  {personalInfo.summary}
                </p>
              </AnimatedSection>
            )}

            {skills.length > 0 && (
              <AnimatedSection title="Skills" icon="⚛" translateZ={sectionTranslateZ} fontSize={fontSize}>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.1, translateZ: badgeTranslateZ }}
                      className="bg-slate-700/30 border border-slate-600 text-slate-300 text-[10px] px-3 py-1.5 rounded-full shadow-lg font-semibold print:text-slate-700"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            )}
            
            {awards.length > 0 && (
               <AnimatedSection title="Awards" icon="🏆" translateZ={sectionTranslateZ} fontSize={fontSize}>
                  <div className="space-y-4">
                    {awards.map((award, i) => (
                      <div key={i}>
                        <h3 className="text-sm font-bold text-slate-100 print:text-black">{award.title}</h3>
                        <p className="text-[10px] text-indigo-400">{award.issuer} · {award.date}</p>
                      </div>
                    ))}
                  </div>
               </AnimatedSection>
            )}
          </div>

          {/* Right Column */}
          <div className="w-2/3 space-y-10">
            {experience.length > 0 && (
              <AnimatedSection title="Experience" icon="💼" translateZ={sectionTranslateZ} fontSize={fontSize}>
                <div className="space-y-8 relative border-l border-slate-700/50 ml-2 pl-6 print:border-slate-200">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-slate-800 border-2 border-indigo-400 group-hover:bg-indigo-400 transition-colors" />
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors print:text-slate-800" style={{ fontSize: `${fontSize + 2}px` }}>{exp.position}</h3>
                        <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 print:text-indigo-600">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs font-black text-cyan-400/80 mb-3 tracking-wider uppercase print:text-purple-600">{exp.company}</p>
                      <p className="text-slate-400 leading-relaxed font-light print:text-slate-600" style={{ fontSize: `${fontSize - 1}px` }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {customSections.map((section, i) => (
              <AnimatedSection key={i} title={section.title || 'Custom'} icon="◈" translateZ={sectionTranslateZ} fontSize={fontSize}>
                <div className="space-y-4">
                  {section.items?.map((item, idx) => (
                    <div key={idx}>
                      {item.title && <h3 className="text-sm font-bold text-slate-100 print:text-black">{item.title}</h3>}
                      {item.content && <p className="text-slate-400 font-light print:text-slate-700" style={{ fontSize: `${fontSize - 1}px` }}>{item.content}</p>}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}} />
    </div>
  );
};

const AnimatedSection = ({ title, icon, translateZ, fontSize, children }) => (
  <motion.section 
    style={{ transform: `translateZ(${translateZ}px)` }}
    className="print:transform-none"
  >
    <h2 className="font-black uppercase tracking-[0.25em] text-cyan-400 mb-5 flex items-center gap-3 print:text-indigo-600" style={{ fontSize: `${fontSize - 2}px` }}>
      <span className="w-8 h-[1px] bg-cyan-400/50" /> {icon} {title}
    </h2>
    {children}
  </motion.section>
);

export default AnimatedTemplate;
