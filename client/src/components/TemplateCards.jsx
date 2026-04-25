import { motion } from 'framer-motion';

const TEMPLATES = [
  {
    id: 'animated',
    name: '3D Artisan 🚀',
    description: 'A modern, digital-first experience for the tech-forward professional.',
    image: 'https://images.unsplash.com/photo-1626197031507-c17099750423?auto=format&fit=crop&q=80&w=400&h=500',
    isNew: true
  },
  {
    id: 'classic',
    name: 'Heritage Classic',
    description: 'A polished, traditional layout that commands professional respect.',
    image: '/templates/classic.png'
  },
  {
    id: 'modern',
    name: 'Modern Creative',
    description: 'Balanced design that highlights your unique professional story.',
    image: '/templates/modern.png'
  },
  {
    id: 'minimal',
    name: 'Pure Minimal',
    description: 'Clean, intentional design that lets your experience speak for itself.',
    image: '/templates/minimal.png'
  },
  {
    id: 'stylish',
    name: 'Executive Royale 👑',
    description: 'High-impact layout tailored for senior leadership and board positions.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400&h=500'
  }
];

const TemplateCards = ({ selectedTemplate, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {TEMPLATES.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(template.id)}
          className={`cursor-pointer group rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
            selectedTemplate === template.id
              ? 'border-primary-500 shadow-lg shadow-primary-500/20'
              : 'border-surface-200 dark:border-surface-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md'
          }`}
        >
          {template.isNew && (
            <div className="absolute top-3 right-3 z-20 bg-primary-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-classic tracking-widest">
              NEW
            </div>
          )}
          <div className="relative aspect-[1/1.4] overflow-hidden bg-surface-100 dark:bg-surface-800">
            <img 
              src={template.image} 
              alt={template.name}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400&h=500';
              }}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                selectedTemplate === template.id ? 'scale-110' : ''
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 bg-primary-600/20 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-primary-600 text-white p-3 rounded-2xl shadow-classic scale-110 animate-in zoom-in duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="p-5 bg-white dark:bg-surface-800 border-t border-surface-100 dark:border-surface-700/50">
            <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
              {template.name}
            </h3>
            <p className="text-sm font-medium text-surface-500 dark:text-surface-400 leading-relaxed">
              {template.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateCards;
