import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe,
  FiBriefcase, FiBook, FiStar, FiFolder, FiAward, FiPlus, FiTrash2,
  FiChevronDown, FiChevronUp, FiFileText,
} from 'react-icons/fi';

const sectionVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: { opacity: 1, height: 'auto', overflow: 'visible', transition: { duration: 0.3 } },
};

const ResumeForm = ({ formData, setFormData }) => {
  const [openSection, setOpenSection] = useState('personal');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const updatePersonalInfo = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  // Dynamic array field helpers
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

  // Skills helpers
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

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: FiUser },
    { id: 'experience', label: 'Work Experience', icon: FiBriefcase },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'skills', label: 'Skills', icon: FiStar },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'certifications', label: 'Certifications', icon: FiAward },
  ];

  return (
    <div className="space-y-3 pb-8">
      <h2 className="text-xl font-bold text-surface-800 dark:text-white flex items-center gap-2 mb-4">
        <FiFileText className="w-5 h-5 text-primary-500" />
        Resume Details
      </h2>

      {sections.map(({ id, label, icon: Icon }) => (
        <div
          key={id}
          className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 overflow-hidden"
        >
          <button
            onClick={() => toggleSection(id)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary-500" />
              </div>
              <span className="font-semibold text-surface-800 dark:text-white">{label}</span>
            </div>
            {openSection === id ? (
              <FiChevronUp className="w-5 h-5 text-surface-400" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-surface-400" />
            )}
          </button>

          <AnimatePresence>
            {openSection === id && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
              >
                <div className="px-5 pb-5 space-y-4 border-t border-surface-100 dark:border-surface-700 pt-4">
                  {/* PERSONAL INFO */}
                  {id === 'personal' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField icon={FiUser} label="Full Name" value={formData.personalInfo?.fullName || ''} onChange={(v) => updatePersonalInfo('fullName', v)} placeholder="John Doe" />
                      <InputField icon={FiMail} label="Email" value={formData.personalInfo?.email || ''} onChange={(v) => updatePersonalInfo('email', v)} placeholder="john@example.com" type="email" />
                      <InputField icon={FiPhone} label="Phone" value={formData.personalInfo?.phone || ''} onChange={(v) => updatePersonalInfo('phone', v)} placeholder="+1 234 567 890" />
                      <InputField icon={FiMapPin} label="Address" value={formData.personalInfo?.address || ''} onChange={(v) => updatePersonalInfo('address', v)} placeholder="New York, NY" />
                      <InputField icon={FiLinkedin} label="LinkedIn" value={formData.personalInfo?.linkedin || ''} onChange={(v) => updatePersonalInfo('linkedin', v)} placeholder="linkedin.com/in/johndoe" />
                      <InputField icon={FiGithub} label="GitHub" value={formData.personalInfo?.github || ''} onChange={(v) => updatePersonalInfo('github', v)} placeholder="github.com/johndoe" />
                      <div className="sm:col-span-2">
                        <InputField icon={FiGlobe} label="Website" value={formData.personalInfo?.website || ''} onChange={(v) => updatePersonalInfo('website', v)} placeholder="johndoe.com" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-surface-500 dark:text-surface-400 mb-1.5">Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updatePersonalInfo('photo', reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/30 dark:file:text-primary-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <TextareaField label="Professional Summary" value={formData.personalInfo?.summary || ''} onChange={(v) => updatePersonalInfo('summary', v)} placeholder="A brief summary of your professional background and career objectives..." />
                      </div>
                    </div>
                  )}

                  {/* EXPERIENCE */}
                  {id === 'experience' && (
                    <div className="space-y-4">
                      {(formData.experience || []).map((exp, i) => (
                        <div key={i} className="p-4 rounded-lg bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 space-y-3 relative">
                          <button onClick={() => removeItem('experience', i)} className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                            <InputField label="Company" value={exp.company} onChange={(v) => updateItem('experience', i, 'company', v)} placeholder="Google" size="sm" />
                            <InputField label="Position" value={exp.position} onChange={(v) => updateItem('experience', i, 'position', v)} placeholder="Software Engineer" size="sm" />
                            <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateItem('experience', i, 'startDate', v)} placeholder="Jan 2022" size="sm" />
                            <InputField label="End Date" value={exp.endDate} onChange={(v) => updateItem('experience', i, 'endDate', v)} placeholder="Present" size="sm" disabled={exp.current} />
                          </div>
                          <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300 cursor-pointer">
                            <input type="checkbox" checked={exp.current || false} onChange={(e) => updateItem('experience', i, 'current', e.target.checked)} className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500" />
                            Currently working here
                          </label>
                          <TextareaField label="Description" value={exp.description} onChange={(v) => updateItem('experience', i, 'description', v)} placeholder="Describe your role and achievements..." size="sm" />
                        </div>
                      ))}
                      <AddButton onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} label="Add Experience" />
                    </div>
                  )}

                  {/* EDUCATION */}
                  {id === 'education' && (
                    <div className="space-y-4">
                      {(formData.education || []).map((edu, i) => (
                        <div key={i} className="p-4 rounded-lg bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 space-y-3 relative">
                          <button onClick={() => removeItem('education', i)} className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                            <InputField label="Institution" value={edu.institution} onChange={(v) => updateItem('education', i, 'institution', v)} placeholder="MIT" size="sm" />
                            <InputField label="Degree" value={edu.degree} onChange={(v) => updateItem('education', i, 'degree', v)} placeholder="Bachelor's" size="sm" />
                            <InputField label="Field of Study" value={edu.field} onChange={(v) => updateItem('education', i, 'field', v)} placeholder="Computer Science" size="sm" />
                            <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateItem('education', i, 'startDate', v)} placeholder="Sep 2018" size="sm" />
                            <InputField label="End Date" value={edu.endDate} onChange={(v) => updateItem('education', i, 'endDate', v)} placeholder="Jun 2022" size="sm" />
                          </div>
                          <TextareaField label="Description" value={edu.description} onChange={(v) => updateItem('education', i, 'description', v)} placeholder="Relevant coursework, achievements..." size="sm" />
                        </div>
                      ))}
                      <AddButton onClick={() => addItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })} label="Add Education" />
                    </div>
                  )}

                  {/* SKILLS */}
                  {id === 'skills' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          placeholder="Type a skill and press Enter..."
                          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addSkill}
                          className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium"
                        >
                          Add
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData.skills || []).map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium"
                          >
                            {skill}
                            <button onClick={() => removeSkill(i)} className="hover:text-red-500 transition-colors">
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PROJECTS */}
                  {id === 'projects' && (
                    <div className="space-y-4">
                      {(formData.projects || []).map((proj, i) => (
                        <div key={i} className="p-4 rounded-lg bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 space-y-3 relative">
                          <button onClick={() => removeItem('projects', i)} className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                            <InputField label="Project Name" value={proj.name} onChange={(v) => updateItem('projects', i, 'name', v)} placeholder="E-Commerce App" size="sm" />
                            <InputField label="Link" value={proj.link} onChange={(v) => updateItem('projects', i, 'link', v)} placeholder="https://github.com/..." size="sm" />
                          </div>
                          <TextareaField label="Description" value={proj.description} onChange={(v) => updateItem('projects', i, 'description', v)} placeholder="What the project does..." size="sm" />
                          <InputField label="Technologies (comma-separated)" value={(proj.technologies || []).join(', ')} onChange={(v) => updateItem('projects', i, 'technologies', v.split(',').map(t => t.trim()))} placeholder="React, Node.js, MongoDB" size="sm" />
                        </div>
                      ))}
                      <AddButton onClick={() => addItem('projects', { name: '', description: '', link: '', technologies: [] })} label="Add Project" />
                    </div>
                  )}

                  {/* CERTIFICATIONS */}
                  {id === 'certifications' && (
                    <div className="space-y-4">
                      {(formData.certifications || []).map((cert, i) => (
                        <div key={i} className="p-4 rounded-lg bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 space-y-3 relative">
                          <button onClick={() => removeItem('certifications', i)} className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                            <InputField label="Name" value={cert.name} onChange={(v) => updateItem('certifications', i, 'name', v)} placeholder="AWS Solutions Architect" size="sm" />
                            <InputField label="Issuer" value={cert.issuer} onChange={(v) => updateItem('certifications', i, 'issuer', v)} placeholder="Amazon" size="sm" />
                            <InputField label="Date" value={cert.date} onChange={(v) => updateItem('certifications', i, 'date', v)} placeholder="Mar 2023" size="sm" />
                            <InputField label="Link" value={cert.link} onChange={(v) => updateItem('certifications', i, 'link', v)} placeholder="https://..." size="sm" />
                          </div>
                        </div>
                      ))}
                      <AddButton onClick={() => addItem('certifications', { name: '', issuer: '', date: '', link: '' })} label="Add Certification" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

/* ── Reusable Sub-Components ── */

const InputField = ({ icon: Icon, label, value, onChange, placeholder, type = 'text', size = 'md', disabled = false }) => (
  <div>
    <label className="block text-xs font-medium text-surface-500 dark:text-surface-400 mb-1.5">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 ${size === 'sm' ? 'py-2 text-sm' : 'py-2.5'} rounded-lg bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all disabled:opacity-50`}
      />
    </div>
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder, size = 'md' }) => (
  <div>
    <label className="block text-xs font-medium text-surface-500 dark:text-surface-400 mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className={`w-full px-4 ${size === 'sm' ? 'py-2 text-sm' : 'py-2.5'} rounded-lg bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all resize-none`}
    />
  </div>
);

const AddButton = ({ onClick, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full py-3 rounded-lg border-2 border-dashed border-primary-300 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
  >
    <FiPlus className="w-4 h-4" />
    {label}
  </motion.button>
);

export default ResumeForm;
