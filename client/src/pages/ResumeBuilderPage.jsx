import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import LoadingSpinner from '../components/LoadingSpinner';
import { getResume, createResume, updateResume } from '../services/resumeService';
import { FiSave, FiDownload, FiLayout, FiCheck } from 'react-icons/fi';
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
  languages: [],
};

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultFormData);
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
          setFormData(data.resume);
          setResumeId(id);
        } catch (err) {
          toast.error('Failed to load resume');
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
      toast.error('Failed to save');
    } finally { setSaving(false); }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return toast.error('Nothing to download');
    toast.loading('Generating PDF...');
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set({
        margin: 0,
        filename: `${formData.title || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).from(element).save();
      toast.dismiss();
      toast.success('PDF downloaded!');
    } catch (err) {
      toast.dismiss();
      toast.error('PDF generation failed');
    }
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

  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'stylish', name: 'Stylish 👑', isPremium: true },
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900"><LoadingSpinner text="Loading resume..." /></div>;
  }

  return (
    <div className="min-h-screen pt-16 bg-surface-50 dark:bg-surface-900">
      <Toaster position="top-right" />
      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-surface-800/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-bold bg-transparent border-none outline-none text-surface-800 dark:text-white placeholder:text-surface-400 w-48 sm:w-64"
              placeholder="Resume Title"
            />
            {saved && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                <FiCheck className="w-3.5 h-3.5" /> Saved
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('template-modal').showModal()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-800 dark:text-white text-sm font-medium transition-colors">
              <FiLayout className="w-4 h-4" /> Templates
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('color-modal').showModal()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-800 dark:text-white text-sm font-medium transition-colors">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--resume-color, #3b82f6)' }} /> Colors
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShareLink} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg> Share
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors disabled:opacity-60">
              <FiSave className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadPDF} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
              <FiDownload className="w-4 h-4" /> PDF
            </motion.button>
          </div>
        </div>
      </div>

      {/* Split Screen */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 128px)' }}>
        {/* Left: Form */}
        <div className="w-full lg:w-[45%] overflow-y-auto p-6 border-r border-surface-200 dark:border-surface-700">
          <ResumeForm formData={formData} setFormData={setFormData} />
        </div>
        {/* Right: Preview */}
        <div className="w-full lg:w-[55%] overflow-y-auto p-6 bg-surface-100 dark:bg-surface-950">
          <ResumePreview formData={formData} template={formData.template} />
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
