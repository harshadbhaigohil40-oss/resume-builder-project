import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import LoadingSpinner from '../components/LoadingSpinner';
import { getResume, createResume, updateResume } from '../services/resumeService';
import { FiSave, FiDownload, FiLayout, FiCheck, FiUpload, FiShare } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import TemplateCards from '../components/TemplateCards';
import ThemeColorPicker from '../components/ThemeColorPicker';

const defaultFormData = {
  title: 'Untitled Resume',
  template: 'classic',
  personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', github: '', website: '', summary: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  volunteer: [],
  awards: [],
  languages: [],
  customSections: [],
  metadata: {
    typography: {
      fontFamily: 'Inter',
      fontSize: 13,
      lineHeight: 1.6,
    },
    layout: {
      margin: 40,
      sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'volunteer', 'awards', 'languages', 'customSections'],
    }
  }
};

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultFormData);

  // Initialize template from gallery selection if provided
  useEffect(() => {
    if (location.state?.selectedTemplate && !id) {
      setFormData(prev => ({ ...prev, template: location.state.selectedTemplate }));
    }
  }, [location.state, id]);

  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [resumeId, setResumeId] = useState(id || null);
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef(null);

  // Load existing resume
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getResume(id);
          // Merge with defaultFormData to ensure all new fields (metadata, etc.) exist
          setFormData({ ...defaultFormData, ...data.resume, 
            metadata: { ...defaultFormData.metadata, ...(data.resume.metadata || {}) },
            personalInfo: { ...defaultFormData.personalInfo, ...(data.resume.personalInfo || {}) }
          });
          setResumeId(id);
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to load resume');
          navigate('/dashboard');
        } finally { setLoading(false); }
      })();
    }
  }, [id, navigate]);

  // Auto-save with debounce
  useEffect(() => {
    if (!resumeId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await updateResume(resumeId, formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) { /* silent auto-save fail */ }
    }, 2000);
    return () => clearTimeout(debounceRef.current);
  }, [formData, resumeId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (resumeId) {
        await updateResume(resumeId, formData);
        toast.success('Resume saved!');
      } else {
        const data = await createResume(formData);
        setResumeId(data.resume._id);
        toast.success('Resume created!');
        navigate(`/builder/${data.resume._id}`, { replace: true });
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorData.errors.forEach(msg => toast.error(msg));
      } else {
        toast.error(errorData?.message || 'Failed to save');
      }
    } finally { setSaving(false); }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return toast.error('Nothing to download');
    
    toast.loading('Generating high-quality PDF...');
    
    try {
      // Ensure images are loaded and layout is stable
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: `${formData.title || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      toast.dismiss();
      toast.success('PDF downloaded!');
    } catch (err) {
      toast.dismiss();
      toast.error('PDF generation failed');
      console.error(err);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${formData.title || 'resume'}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('JSON exported!');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        setFormData({ ...defaultFormData, ...json });
        toast.success('Resume imported successfully!');
      } catch (err) {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = null;
  };

  const handleShareLink = async () => {
    if (!resumeId) {
      toast.error('Please save your resume first');
      return;
    }
    toast.loading('Generating link...');
    try {
      const { default: api } = await import('../services/api');
      const username = user.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
      const res = await api.post('/portfolio', {
        username: username,
        resumeId: resumeId,
        themeColor: '#3b82f6',
        isPublic: true
      });
      const url = `${window.location.origin}/portfolio/${res.data.data.username}`;
      await navigator.clipboard.writeText(url);
      toast.dismiss();
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.dismiss();
      // If portfolio already exists for user, fetch it and copy
      if (err.response?.status === 400 || err.response?.status === 500) {
        try {
          const { default: api } = await import('../services/api');
          const res = await api.get('/portfolio/settings/me');
          const url = `${window.location.origin}/portfolio/${res.data.data.username}`;
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
          return;
        } catch (fetchErr) {}
      }
      toast.error('Failed to generate link');
    }
  };

  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

  const templates = [
    { id: 'animated', name: '3D Animated 🚀', isPremium: true },
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'stylish', name: 'Stylish 👑', isPremium: true },
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900"><LoadingSpinner text="Loading resume..." /></div>;
  }

  return (
    <div className="min-h-screen pt-16 bg-surface-50 dark:bg-surface-950 flex flex-col">
      <Toaster position="top-right" />
      
      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800 overflow-x-auto custom-scrollbar">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-6 min-w-max lg:min-w-0">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-display font-black bg-transparent border-none outline-none text-surface-900 dark:text-white placeholder:text-surface-400 w-48 sm:w-64 focus:ring-0"
              placeholder="Resume Title"
            />
            {saved && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-500 font-black bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <FiCheck className="w-3 h-3" /> Saved
              </motion.span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl lg:hidden mr-2 relative">
              <div 
                className="absolute h-8 bg-white dark:bg-surface-700 rounded-lg shadow-sm transition-all duration-300 ease-out"
                style={{ 
                  width: 'calc(50% - 4px)', 
                  left: activeTab === 'edit' ? '4px' : 'calc(50%)',
                }}
              />
              <button 
                onClick={() => setActiveTab('edit')}
                className={`relative z-10 px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'edit' ? 'text-primary-600' : 'text-surface-500 hover:text-surface-700'}`}
              >
                Edit
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`relative z-10 px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'preview' ? 'text-primary-600' : 'text-surface-500 hover:text-surface-700'}`}
              >
                Preview
              </button>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('template-modal').showModal()} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold transition-all shadow-sm">
              <FiLayout className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Templates</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('color-modal').showModal()} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold transition-all shadow-sm">
              <div className="w-3.5 h-3.5 rounded-full border border-black/5 dark:border-white/10" style={{ backgroundColor: 'var(--resume-color, #3b82f6)' }} /> <span className="hidden sm:inline">Colors</span>
            </motion.button>
            <div className="h-6 w-[1px] bg-surface-200 dark:bg-surface-700 mx-1 hidden lg:block" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold shadow-classic hover:bg-primary-500 transition-all disabled:opacity-60">
              <FiSave className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleDownloadPDF} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-500 transition-all">
              <FiDownload className="w-3.5 h-3.5" /> PDF
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleShareLink} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-classic hover:bg-indigo-500 transition-all">
              <FiShare className="w-3.5 h-3.5" /> Share
            </motion.button>
            <div className="h-6 w-[1px] bg-surface-200 dark:bg-surface-700 mx-1" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleExportJSON} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold transition-all shadow-sm" title="Export JSON">
              <FiDownload className="w-3.5 h-3.5" /> <span className="hidden xl:inline">Export</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('import-json').click()} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold transition-all shadow-sm" title="Import JSON">
              <FiUpload className="w-3.5 h-3.5" /> <span className="hidden xl:inline">Import</span>
            </motion.button>
            <input type="file" id="import-json" className="hidden" accept=".json" onChange={handleImportJSON} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row h-full overflow-hidden bg-white dark:bg-surface-900">
        {/* Form Column */}
        <div className={`w-full lg:w-[45%] h-full overflow-y-auto custom-scrollbar border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 transition-all duration-300 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 sm:p-8">
            <ResumeForm formData={formData} setFormData={setFormData} />
          </div>
        </div>
        {/* Preview Column */}
        <div className={`w-full lg:w-[55%] h-full overflow-y-auto custom-scrollbar bg-surface-100/50 dark:bg-surface-950/50 transition-all duration-300 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 sm:p-10 flex flex-col items-center">
            <ResumePreview formData={formData} template={formData.template} />
          </div>
        </div>
      </div>

      {/* Template Modal */}
      <dialog id="template-modal" className="modal bg-surface-900/50 backdrop-blur-sm fixed inset-0 w-full h-full p-4 sm:p-10 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 [&[open]]:opacity-100 [&[open]]:pointer-events-auto" onClick={(e) => { if(e.target.id === 'template-modal') e.target.close(); }}>
        <div className="bg-white dark:bg-surface-900 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col p-0 m-auto relative">
          <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
            <h3 className="text-xl font-bold text-surface-900 dark:text-white">Choose a Template</h3>
            <button onClick={() => document.getElementById('template-modal').close()} className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300">✕</button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <TemplateCards 
              selectedTemplate={formData.template} 
              onSelect={(id) => { 
                setFormData(prev => ({ ...prev, template: id }));
                document.getElementById('template-modal').close();
              }} 
            />
          </div>
        </div>
      </dialog>

      {/* Color Modal */}
      <dialog id="color-modal" className="modal bg-surface-900/50 backdrop-blur-sm fixed inset-0 w-full h-full p-4 sm:p-10 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 [&[open]]:opacity-100 [&[open]]:pointer-events-auto" onClick={(e) => { if(e.target.id === 'color-modal') e.target.close(); }}>
        <div className="bg-white dark:bg-surface-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col p-0 m-auto relative">
          <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
            <h3 className="text-xl font-bold text-surface-900 dark:text-white">Choose Accent Color</h3>
            <button onClick={() => document.getElementById('color-modal').close()} className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300">✕</button>
          </div>
          <div className="p-6">
            <ThemeColorPicker />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ResumeBuilderPage;
