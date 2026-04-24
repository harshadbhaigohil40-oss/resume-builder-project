import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiDownload, FiTrash2, FiClock, FiCopy, FiExternalLink, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createResume } from '../services/resumeService';

const DashboardCard = ({ resume, onDelete, onUpdate, isNew = false }) => {
  const navigate = useNavigate();

  if (isNew) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/builder')}
        className="group cursor-pointer rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-600 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-surface-800/50 p-8 flex flex-col items-center justify-center gap-4 transition-colors min-h-[300px]"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center group-hover:shadow-glow transition-shadow">
          <FiPlus className="w-8 h-8 text-primary-500" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Create New Resume</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Start from scratch or pick a template</p>
        </div>
      </motion.div>
    );
  }

  const templateColors = {
    classic: 'from-blue-500 to-indigo-600',
    modern: 'from-purple-500 to-pink-600',
    minimal: 'from-emerald-500 to-teal-600',
    stylish: 'from-indigo-600 to-purple-600',
    animated: 'from-cyan-500 to-blue-600',
    megafolk: 'from-slate-800 to-black',
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const handleDuplicate = async (e) => {
    e.stopPropagation();
    toast.loading('Duplicating resume...');
    try {
      const { _id, createdAt, updatedAt, user, ...resumeData } = resume;
      const duplicatedData = {
        ...resumeData,
        title: `${resume.title || 'Untitled'} (Copy)`
      };
      await createResume(duplicatedData);
      toast.dismiss();
      toast.success('Resume duplicated!');
      if (onUpdate) onUpdate(); // Refresh the list
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to duplicate resume');
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    toast.loading('Generating share link...');
    try {
      const { default: api } = await import('../services/api');
      // We'll use a simpler version of the share logic
      // Ideally, the user already has a portfolio. If not, we'd need to create one.
      // For now, let's just copy the builder link or a direct viewer link if it exists.
      const url = `${window.location.origin}/builder/${resume._id}`;
      await navigator.clipboard.writeText(url);
      toast.dismiss();
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to copy link');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300"
    >
      {/* Template color bar */}
      <div className={`h-2 bg-gradient-to-r ${templateColors[resume.template] || templateColors.classic}`} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-surface-800 dark:text-white truncate group-hover:text-primary-500 transition-colors">
              {resume.title || 'Untitled Resume'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
                {resume.template}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-surface-400 font-bold uppercase">
                <FiClock className="w-3 h-3" />
                {formatDate(resume.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
             <button onClick={handleDuplicate} className="p-2 rounded-lg text-surface-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10" title="Duplicate">
                <FiCopy className="w-4 h-4" />
             </button>
             <button onClick={handleShare} className="p-2 rounded-lg text-surface-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10" title="Share Link">
                <FiShare2 className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
            <div className="w-6 h-6 rounded bg-surface-100 dark:bg-surface-700 flex items-center justify-center">👤</div>
            <span className="truncate">{resume.personalInfo?.fullName || 'No Name'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <div className="w-6 h-6 rounded bg-surface-100 dark:bg-surface-700 flex items-center justify-center">✉️</div>
            <span className="truncate">{resume.personalInfo?.email || 'No Email'}</span>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-surface-100 dark:border-surface-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/builder/${resume._id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-sm font-bold transition-all hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-white"
          >
            <FiEdit3 className="w-4 h-4" />
            Open Editor
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(resume._id)}
            className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
          >
            <FiTrash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
