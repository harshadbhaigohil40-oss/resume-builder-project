import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiDownload, FiTrash2, FiClock, FiCopy, FiExternalLink, FiShare2, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createResume, forwardResume } from '../services/resumeService';

const DashboardCard = ({ resume, onDelete, onUpdate, isNew = false }) => {
  const navigate = useNavigate();

  if (isNew) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/builder')}
        className="group cursor-pointer rounded-3xl border-2 border-dashed border-surface-200 dark:border-surface-700 hover:border-primary-500 hover:bg-white dark:hover:bg-surface-800/80 p-8 flex flex-col items-center justify-center gap-5 transition-all duration-300 min-h-[320px] bg-surface-50/50 dark:bg-surface-800/30"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-classic group-hover:scale-110 transition-transform duration-300">
          <FiPlus className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white">Create New Resume</h3>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400 mt-2">Design your next career milestone</p>
        </div>
      </motion.div>
    );
  }

  const templateColors = {
    classic: 'bg-primary-600',
    modern: 'bg-indigo-600',
    minimal: 'bg-slate-600',
    stylish: 'bg-primary-500',
    animated: 'bg-blue-600',
    megafolk: 'bg-black',
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
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to duplicate resume');
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    toast.loading('Generating share link...');
    try {
      const url = `${window.location.origin}/builder/${resume._id}`;
      await navigator.clipboard.writeText(url);
      toast.dismiss();
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to copy link');
    }
  };

  const handleForward = async (e) => {
    e.stopPropagation();
    toast.loading('Forwarding to Gmail...');
    try {
      await forwardResume(resume._id);
      toast.dismiss();
      toast.success('Resume link sent to your Gmail!');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to forward resume');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      className="group rounded-3xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 overflow-hidden shadow-sm hover:shadow-classic transition-all duration-500"
    >
      {/* Template indicator bar */}
      <div className={`h-1.5 ${templateColors[resume.template] || templateColors.classic}`} />

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
              {resume.title || 'Untitled Resume'}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800">
                {resume.template}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-surface-400 font-bold uppercase tracking-wider">
                <FiClock className="w-3.5 h-3.5" />
                {formatDate(resume.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button onClick={handleDuplicate} className="p-2.5 rounded-xl text-surface-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all" title="Duplicate">
                <FiCopy className="w-4.5 h-4.5" />
             </button>
             <button onClick={handleShare} className="p-2.5 rounded-xl text-surface-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all" title="Share Link">
                <FiShare2 className="w-4.5 h-4.5" />
             </button>
             <button onClick={handleForward} className="p-2.5 rounded-xl text-surface-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all" title="Forward to Gmail">
                <FiMail className="w-4.5 h-4.5" />
             </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300 font-medium">
            <div className="w-8 h-8 rounded-lg bg-surface-50 dark:bg-surface-700/50 flex items-center justify-center text-xs">👤</div>
            <span className="truncate">{resume.personalInfo?.fullName || 'No Name'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400 font-medium">
            <div className="w-8 h-8 rounded-lg bg-surface-50 dark:bg-surface-700/50 flex items-center justify-center text-xs">✉️</div>
            <span className="truncate">{resume.personalInfo?.email || 'No Email'}</span>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-surface-100 dark:border-surface-700">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/builder/${resume._id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-sm hover:bg-primary-500 transition-all"
          >
            <FiEdit3 className="w-4 h-4" />
            Open Editor
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(resume._id)}
            className="p-3 rounded-xl text-red-500 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
          >
            <FiTrash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
