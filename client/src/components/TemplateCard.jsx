import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const TemplateCard = ({ template, isSelected, onSelect }) => {
  const templateStyles = {
    classic: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      accent: 'text-blue-600 dark:text-blue-400',
      description: 'Traditional and professional design for corporate roles',
    },
    modern: {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      accent: 'text-purple-600 dark:text-purple-400',
      description: 'Bold and creative layout for modern professionals',
    },
    minimal: {
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      accent: 'text-emerald-600 dark:text-emerald-400',
      description: 'Clean and minimal design that lets content shine',
    },
    animated: {
      gradient: 'from-slate-800 to-slate-900',
      bg: 'bg-slate-800 dark:bg-slate-900',
      accent: 'text-cyan-400 dark:text-cyan-400',
      description: 'Interactive 3D animated dark theme template.',
    },
  };

  const style = templateStyles[template.id] || templateStyles.classic;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template.id)}
      className={`relative cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border-2 transition-all duration-300 ${
        isSelected
          ? 'border-primary-500 shadow-glow'
          : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
      }`}
    >
      {/* Selected badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-lg"
        >
          <FiCheck className="w-5 h-5 text-white" />
        </motion.div>
      )}

      {/* Template Preview Mockup */}
      <div className={`h-48 bg-gradient-to-br ${style.gradient} p-6 flex items-end`}>
        <div className="w-full space-y-2">
          <div className="h-3 w-3/4 bg-white/30 rounded" />
          <div className="h-2 w-1/2 bg-white/20 rounded" />
          <div className="flex gap-2 mt-3">
            <div className="h-2 w-16 bg-white/20 rounded" />
            <div className="h-2 w-12 bg-white/20 rounded" />
            <div className="h-2 w-14 bg-white/20 rounded" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-surface-800 dark:text-white capitalize">
          {template.name}
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          {style.description}
        </p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
