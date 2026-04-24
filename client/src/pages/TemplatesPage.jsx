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
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-surface-500 hover:text-primary-500 transition-colors mb-6"
          >
            <FiArrowLeft /> Back
          </motion.button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-primary-500 font-bold uppercase tracking-wider text-sm mb-2"
              >
                <FiLayout /> Professional Layouts
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-black text-surface-900 dark:text-white"
              >
                Choose Your <span className="text-gradient">Template</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-surface-500 dark:text-surface-400 max-w-md text-lg"
            >
              Select a professionally designed template to start building your career-changing resume.
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
