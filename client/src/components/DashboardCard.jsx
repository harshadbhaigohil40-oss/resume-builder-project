import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiDownload, FiTrash2, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ resume, onDelete, isNew = false }) => {
  const navigate = useNavigate();

  if (isNew) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/builder')}
        className="group cursor-pointer rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-600 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-surface-800/50 p-8 flex flex-col items-center justify-center gap-4 transition-colors min-h-[260px]"
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
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
            <h3 className="text-lg font-semibold text-surface-800 dark:text-white truncate">
              {resume.title || 'Untitled Resume'}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 capitalize">
              {resume.template}
            </span>
          </div>
        </div>

        {/* Preview info */}
        <div className="space-y-1.5 mb-5">
          {resume.personalInfo?.fullName && (
            <p className="text-sm text-surface-600 dark:text-surface-300 truncate">
              👤 {resume.personalInfo.fullName}
            </p>
          )}
          {resume.personalInfo?.email && (
            <p className="text-sm text-surface-500 dark:text-surface-400 truncate">
              ✉️ {resume.personalInfo.email}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500 mb-5">
          <FiClock className="w-3.5 h-3.5" />
          Updated {formatDate(resume.updatedAt)}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-surface-100 dark:border-surface-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/builder/${resume._id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors"
          >
            <FiEdit3 className="w-4 h-4" />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(resume._id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            title="Delete resume"
          >
            <FiTrash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
