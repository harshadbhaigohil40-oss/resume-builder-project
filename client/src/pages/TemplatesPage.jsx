import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TemplateCards from '../components/TemplateCards';
import { FiArrowLeft, FiLayout } from 'react-icons/fi';

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    // Navigate to builder with the selected template
    // We can pass the template as state or query param
    navigate('/builder', { state: { selectedTemplate: templateId } });
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-surface-500 hover:text-primary-600 font-semibold transition-all mb-8 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
          </motion.button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold uppercase tracking-[0.2em] text-xs mb-4"
              >
                <FiLayout className="w-4 h-4" /> Professional Layouts
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl font-display font-black text-surface-900 dark:text-white leading-tight"
              >
                Choose Your <span className="text-primary-600">Template</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-surface-500 dark:text-surface-400 max-w-md text-xl font-medium leading-relaxed"
            >
              Select a professionally designed template to showcase your expertise and land your dream role.
            </motion.p>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TemplateCards onSelect={handleSelectTemplate} />
        </motion.div>
      </div>
    </div>
  );
};

export default TemplatesPage;
