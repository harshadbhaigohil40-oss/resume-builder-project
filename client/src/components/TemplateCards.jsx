import { motion } from 'framer-motion';

const TEMPLATES = [
  {
    id: 'animated',
    name: '3D Animated 🚀',
    description: 'Interactive 3D animated dark theme template.',
    image: 'https://placehold.co/400x500/0f172a/38bdf8?text=Animated+3D',
    isNew: true
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'A clean, traditional layout perfect for corporate roles.',
    image: 'https://placehold.co/400x500/e2e8f0/475569?text=Classic+Template'
  },
  {
    id: 'modern',
    name: 'Modern Creative',
    description: 'A sleek design with a modern touch for creative fields.',
    image: 'https://placehold.co/400x500/e2e8f0/475569?text=Modern+Template'
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    description: 'Focus on content with this elegant, minimal design.',
    image: 'https://placehold.co/400x500/e2e8f0/475569?text=Minimal+Template'
  },
  {
    id: 'stylish',
    name: 'Executive Stylish 👑',
    description: 'Sophisticated layout designed for senior positions.',
    image: 'https://placehold.co/400x500/e2e8f0/475569?text=Stylish+Template'
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
            <div className="absolute top-2 left-2 z-20 bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
          )}
          <div className="relative aspect-[1/1.4] overflow-hidden bg-surface-100 dark:bg-surface-800">
            {/* Image Placeholder */}
            <img 
              src={template.image} 
              alt={template.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                selectedTemplate === template.id ? 'scale-105' : ''
              }`}
            />
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 bg-primary-500/10 flex items-center justify-center">
                <div className="bg-primary-500 text-white p-2 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white dark:bg-surface-800">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">
              {template.name}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              {template.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateCards;
