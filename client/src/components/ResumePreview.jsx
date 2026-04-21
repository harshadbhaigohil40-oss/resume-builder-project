import { motion, AnimatePresence } from 'framer-motion';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import StylishTemplate from '../templates/StylishTemplate';

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  stylish: StylishTemplate,
};

const ResumePreview = ({ formData, template = 'classic' }) => {
  const TemplateComponent = templates[template] || ClassicTemplate;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto bg-surface-100 dark:bg-surface-900 rounded-xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="shadow-2xl mx-auto overflow-hidden"
            style={{
              width: '210mm',
              minHeight: '297mm',
              maxWidth: '100%',
              transformOrigin: 'top center',
            }}
          >
            <div id="resume-preview" className="bg-white w-full h-full">
              <TemplateComponent data={formData} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumePreview;
