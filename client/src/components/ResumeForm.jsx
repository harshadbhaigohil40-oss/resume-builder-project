import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe,
  FiBriefcase, FiBook, FiStar, FiFolder, FiAward, FiPlus, FiTrash2,
  FiFileText, FiHeart, FiType, FiGlobe as FiLanguages,
  FiSettings, FiMaximize, FiType as FiFont, FiArrowRight, FiArrowLeft, FiCheck
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import Input from './ui/Input';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const STEPS = [
  { id: 'design', label: 'Design', icon: FiSettings, color: 'blue' },
  { id: 'basics', label: 'Basics', icon: FiUser, color: 'indigo' },
  { id: 'experience', label: 'Work', icon: FiBriefcase, color: 'purple' },
  { id: 'education', label: 'Education', icon: FiBook, color: 'emerald' },
  { id: 'skills', label: 'Skills', icon: FiStar, color: 'amber' },
  { id: 'projects', label: 'Projects', icon: FiFolder, color: 'rose' },
  { id: 'extras', label: 'Extras', icon: FiAward, color: 'cyan' },
];

const ResumeForm = ({ formData, setFormData }) => {
  const [[step, direction], setStep] = useState([0, 0]);

  const validateStep = () => {
    if (STEPS[step].id === 'basics') {
      if (!formData.personalInfo?.fullName?.trim()) {
        toast.error('Full Name is required');
        return false;
      }
      if (!formData.personalInfo?.email?.trim()) {
        toast.error('Email is required');
        return false;
      }
    }
    return true;
  };

  const paginate = (newDirection) => {
    if (newDirection === 1 && !validateStep()) return;
    if (step + newDirection < 0 || step + newDirection >= STEPS.length) return;
    setStep([step + newDirection, newDirection]);
  };

  const updateMetadata = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...(prev.metadata || {}),
        [category]: { ...(prev.metadata?.[category] || {}), [field]: value }
      }
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateItem = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const [skillInput, setSkillInput] = useState('');
  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-1 group relative">
              <button
                onClick={() => setStep([i, i > step ? 1 : -1])}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  ${i === step 
                    ? 'gradient-primary text-white shadow-glow scale-110' 
                    : i < step 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200'
                  }
                `}
              >
                {i < step ? <FiCheck className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </button>
              <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${i === step ? 'text-primary-500' : 'text-surface-400'}`}>
                {s.label}
              </span>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Step {i + 1}: {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            className="h-full gradient-primary shadow-glow"
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 relative overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="space-y-6"
          >
            {/* DESIGN STEP */}
            {STEPS[step].id === 'design' && (
              <div className="space-y-8">
                <SectionHeader icon={FiSettings} title="Layout & Typography" subtitle="Configure the global look and feel of your resume." />
                
                <div className="space-y-6 bg-white dark:bg-surface-800/50 p-6 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm">
                  <div>
                    <label className="block text-xs font-black text-surface-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FiFont className="w-4 h-4" /> Typography Settings
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-500">Font Family</label>
                        <select 
                          value={formData.metadata?.typography?.fontFamily || 'Inter'} 
                          onChange={(e) => updateMetadata('typography', 'fontFamily', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white text-sm focus:border-primary-500 outline-none transition-all"
                        >
                          <option value="Inter">Inter (Sans)</option>
                          <option value="'Roboto', sans-serif">Roboto</option>
                          <option value="'Georgia', serif">Georgia (Serif)</option>
                          <option value="'Courier New', monospace">Courier New (Mono)</option>
                          <option value="'Playfair Display', serif">Playfair Display</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-surface-500">Base Font Size ({formData.metadata?.typography?.fontSize || 13}px)</label>
                        <input 
                          type="range" min="10" max="18" step="1"
                          value={formData.metadata?.typography?.fontSize || 13}
                          onChange={(e) => updateMetadata('typography', 'fontSize', parseInt(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-surface-500">Line Spacing ({formData.metadata?.typography?.lineHeight || 1.6})</label>
                        <input 
                          type="range" min="1" max="2.5" step="0.1"
                          value={formData.metadata?.typography?.lineHeight || 1.6}
                          onChange={(e) => updateMetadata('typography', 'lineHeight', parseFloat(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-surface-100 dark:border-surface-700">
                    <label className="block text-xs font-black text-surface-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FiMaximize className="w-4 h-4" /> Layout Settings
                    </label>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-surface-500">Global Margins ({formData.metadata?.layout?.margin || 40}px)</label>
                      <input 
                        type="range" min="0" max="100" step="4"
                        value={formData.metadata?.layout?.margin || 40}
                        onChange={(e) => updateMetadata('layout', 'margin', parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BASICS STEP */}
            {STEPS[step].id === 'basics' && (
              <div className="space-y-6">
                <SectionHeader icon={FiUser} title="Personal Information" subtitle="Let employers know who you are and how to reach you." />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" value={formData.personalInfo?.fullName || ''} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} placeholder="John Doe" required />
                  <Input label="Email Address" value={formData.personalInfo?.email || ''} onChange={(e) => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" type="email" required />
                  <Input label="Phone Number" value={formData.personalInfo?.phone || ''} onChange={(e) => updatePersonalInfo('phone', e.target.value)} placeholder="+1 234 567 890" />
                  <Input label="Location" value={formData.personalInfo?.address || ''} onChange={(e) => updatePersonalInfo('address', e.target.value)} placeholder="New York, NY" />
                  <Input label="LinkedIn URL" value={formData.personalInfo?.linkedin || ''} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} placeholder="linkedin.com/in/johndoe" />
                  <Input label="GitHub URL" value={formData.personalInfo?.github || ''} onChange={(e) => updatePersonalInfo('github', e.target.value)} placeholder="github.com/johndoe" />
                  <div className="sm:col-span-2">
                    <Input label="Portfolio / Website" value={formData.personalInfo?.website || ''} onChange={(e) => updatePersonalInfo('website', e.target.value)} placeholder="johndoe.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-surface-500 dark:text-surface-400 ml-1 mb-2 block">Professional Summary</label>
                    <textarea
                      value={formData.personalInfo?.summary || ''}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      placeholder="Briefly describe your career goals and key strengths..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border-2 border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:border-primary-500 outline-none transition-all min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE STEP */}
            {STEPS[step].id === 'experience' && (
              <div className="space-y-6">
                <SectionHeader icon={FiBriefcase} title="Work Experience" subtitle="List your relevant roles, starting with the most recent." />
                <div className="space-y-6">
                  {(formData.experience || []).map((exp, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 relative group transition-all hover:border-primary-500/30">
                      <button onClick={() => removeItem('experience', i)} className="absolute top-4 right-4 p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Input label="Company Name" value={exp.company} onChange={(e) => updateItem('experience', i, 'company', e.target.value)} placeholder="Google" />
                        <Input label="Job Title" value={exp.position} onChange={(e) => updateItem('experience', i, 'position', e.target.value)} placeholder="Senior Software Engineer" />
                        <Input label="Start Date" value={exp.startDate} onChange={(e) => updateItem('experience', i, 'startDate', e.target.value)} placeholder="Jan 2020" />
                        <Input label="End Date" value={exp.endDate} onChange={(e) => updateItem('experience', i, 'endDate', e.target.value)} placeholder="Present" disabled={exp.current} />
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-surface-500 cursor-pointer mb-4">
                        <input type="checkbox" checked={exp.current} onChange={(e) => updateItem('experience', i, 'current', e.target.checked)} className="w-4 h-4 rounded border-2 border-surface-300 text-primary-500 focus:ring-primary-500" />
                        Currently working in this role
                      </label>
                      <label className="text-xs font-black uppercase tracking-widest text-surface-500 mb-2 block">Key Achievements</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateItem('experience', i, 'description', e.target.value)}
                        placeholder="Led a team of 5 engineers to launch a new product feature..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border-2 border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:border-primary-500 outline-none transition-all min-h-[100px] resize-none"
                      />
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} label="Add Experience" />
                </div>
              </div>
            )}

            {/* EDUCATION STEP */}
            {STEPS[step].id === 'education' && (
              <div className="space-y-6">
                <SectionHeader icon={FiBook} title="Education" subtitle="Add your degrees, certifications, and academic achievements." />
                <div className="space-y-6">
                  {(formData.education || []).map((edu, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 relative group transition-all hover:border-primary-500/30">
                      <button onClick={() => removeItem('education', i)} className="absolute top-4 right-4 p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Institution" value={edu.institution} onChange={(e) => updateItem('education', i, 'institution', e.target.value)} placeholder="MIT" />
                        <Input label="Degree / Diploma" value={edu.degree} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
                        <Input label="Start Date" value={edu.startDate} onChange={(e) => updateItem('education', i, 'startDate', e.target.value)} placeholder="2016" />
                        <Input label="End Date" value={edu.endDate} onChange={(e) => updateItem('education', i, 'endDate', e.target.value)} placeholder="2020" />
                      </div>
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })} label="Add Education" />
                </div>
              </div>
            )}

            {/* SKILLS STEP */}
            {STEPS[step].id === 'skills' && (
              <div className="space-y-8">
                <SectionHeader icon={FiStar} title="Skills & Languages" subtitle="Highlight your technical expertise and communication abilities." />
                
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-surface-500 ml-1">Technical Skills</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="e.g. React.js, Python, Figma..."
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border-2 border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:border-primary-500 outline-none transition-all"
                    />
                    <Button onClick={addSkill}>Add Skill</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(formData.skills || []).map((skill, i) => (
                      <motion.span
                        key={i}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-bold border border-primary-500/20"
                      >
                        {skill}
                        <button onClick={() => removeSkill(i)} className="hover:text-red-500 transition-colors">
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-surface-100 dark:border-surface-700">
                  <label className="text-xs font-black uppercase tracking-widest text-surface-500 ml-1 block mb-4">Languages</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(formData.languages || []).map((lang, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white dark:bg-surface-800 p-3 rounded-xl border-2 border-surface-200 dark:border-surface-700">
                         <div className="flex-1 space-y-3">
                           <Input placeholder="Language (English)" value={lang.name} onChange={(e) => updateItem('languages', i, 'name', e.target.value)} />
                           <Input placeholder="Level (Native)" value={lang.level} onChange={(e) => updateItem('languages', i, 'level', e.target.value)} />
                         </div>
                         <button onClick={() => removeItem('languages', i)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                           <FiTrash2 className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <AddButton onClick={() => addItem('languages', { name: '', level: '' })} label="Add Language" />
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS STEP */}
            {STEPS[step].id === 'projects' && (
              <div className="space-y-6">
                <SectionHeader icon={FiFolder} title="Projects & Certs" subtitle="Showcase your independent work and professional credentials." />
                <div className="space-y-6">
                  {(formData.projects || []).map((proj, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 relative group transition-all hover:border-primary-500/30">
                      <button onClick={() => removeItem('projects', i)} className="absolute top-4 right-4 p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Input label="Project Name" value={proj.name} onChange={(e) => updateItem('projects', i, 'name', e.target.value)} placeholder="E-Commerce App" />
                        <Input label="Project Link" value={proj.link} onChange={(e) => updateItem('projects', i, 'link', e.target.value)} placeholder="github.com/..." />
                      </div>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateItem('projects', i, 'description', e.target.value)}
                        placeholder="Developed a full-stack platform using MERN..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border-2 border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:border-primary-500 outline-none transition-all min-h-[80px] resize-none mb-4"
                      />
                      <Input label="Technologies" value={(proj.technologies || []).join(', ')} onChange={(e) => updateItem('projects', i, 'technologies', e.target.value.split(',').map(t => t.trim()))} placeholder="React, Node, MongoDB" />
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('projects', { name: '', description: '', link: '', technologies: [] })} label="Add Project" />
                </div>
              </div>
            )}

            {/* EXTRAS STEP */}
            {STEPS[step].id === 'extras' && (
              <div className="space-y-8">
                <SectionHeader icon={FiAward} title="Additional Sections" subtitle="Awards, Volunteer work, and custom sections." />
                
                {/* AWARDS */}
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-surface-500 ml-1">Awards & Recognition</label>
                  {(formData.awards || []).map((award, i) => (
                    <div key={i} className="flex gap-3 bg-white dark:bg-surface-800 p-4 rounded-xl border-2 border-surface-200 dark:border-surface-700 items-start">
                      <div className="flex-1 space-y-3">
                         <Input placeholder="Award Title" value={award.title} onChange={(e) => updateItem('awards', i, 'title', e.target.value)} />
                         <Input placeholder="Issuer" value={award.issuer} onChange={(e) => updateItem('awards', i, 'issuer', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem('awards', i)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('awards', { title: '', issuer: '', date: '', description: '' })} label="Add Award" />
                </div>

                {/* VOLUNTEER */}
                <div className="pt-8 border-t border-surface-100 dark:border-surface-700 space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-surface-500 ml-1">Volunteer Work</label>
                  {(formData.volunteer || []).map((vol, i) => (
                    <div key={i} className="p-4 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 space-y-3 relative">
                       <button onClick={() => removeItem('volunteer', i)} className="absolute top-2 right-2 p-2 text-red-400 hover:bg-red-50 rounded-lg">
                        <FiTrash2 className="w-4 h-4" />
                       </button>
                       <Input label="Organization" value={vol.organization} onChange={(e) => updateItem('volunteer', i, 'organization', e.target.value)} />
                       <Input label="Role" value={vol.position} onChange={(e) => updateItem('volunteer', i, 'position', e.target.value)} />
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('volunteer', { organization: '', position: '', date: '', description: '' })} label="Add Volunteer Work" />
                </div>

                {/* CUSTOM SECTIONS */}
                <div className="pt-8 border-t border-surface-100 dark:border-surface-700 space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-surface-500 ml-1">Custom Sections</label>
                  {(formData.customSections || []).map((section, i) => (
                    <div key={i} className="p-4 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 space-y-4 relative">
                       <button onClick={() => removeItem('customSections', i)} className="absolute top-2 right-2 p-2 text-red-400 hover:bg-red-50 rounded-lg">
                        <FiTrash2 className="w-4 h-4" />
                       </button>
                       <Input label="Section Title" value={section.title} onChange={(e) => updateItem('customSections', i, 'title', e.target.value)} placeholder="Interests" />
                    </div>
                  ))}
                  <AddButton onClick={() => addItem('customSections', { title: '', items: [] })} label="Add Custom Section" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center bg-white dark:bg-surface-900 sticky bottom-0 z-10">
        <Button 
          variant="secondary" 
          onClick={() => paginate(-1)} 
          disabled={step === 0}
          icon={FiArrowLeft}
        >
          Previous
        </Button>
        <div className="text-xs font-black text-surface-400 uppercase tracking-[0.2em]">
          Step {step + 1} / {STEPS.length}
        </div>
        <Button 
          variant={step === STEPS.length - 1 ? 'success' : 'primary'} 
          onClick={() => step === STEPS.length - 1 ? null : paginate(1)} 
          icon={step === STEPS.length - 1 ? FiCheck : FiArrowRight}
          className={step === STEPS.length - 1 ? 'px-8' : ''}
        >
          {step === STEPS.length - 1 ? 'Finish!' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};

/* ── Reusable Sub-Components ── */

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center shadow-sm">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-2xl font-black text-surface-900 dark:text-white tracking-tight">{title}</h3>
    </div>
    <p className="text-sm text-surface-500 dark:text-surface-400 font-medium ml-1">
      {subtitle}
    </p>
  </div>
);

const AddButton = ({ onClick, label }) => (
  <motion.button
    whileHover={{ scale: 1.01, borderColor: '#6366f1' }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className="w-full py-4 rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-surface-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/5 text-sm font-bold flex items-center justify-center gap-2 transition-all"
  >
    <FiPlus className="w-5 h-5" />
    {label}
  </motion.button>
);

export default ResumeForm;
