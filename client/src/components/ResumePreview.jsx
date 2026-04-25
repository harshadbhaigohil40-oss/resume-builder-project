import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import StylishTemplate from '../templates/StylishTemplate';
import AnimatedTemplate from '../templates/AnimatedTemplate';
import MegafolkTemplate from '../templates/MegafolkTemplate';

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  stylish: StylishTemplate,
  animated: AnimatedTemplate,
  megafolk: MegafolkTemplate,
};

const ResumePreview = ({ formData, template = 'classic' }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  
  const TemplateComponent = useMemo(() => {
    return templates[template] || ClassicTemplate;
  }, [template]);

  // Auto-scaling logic to fit the A4 document into the container width
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      // 210mm is approx 794px. We add some padding.
      const documentWidth = 794 + 64; // 210mm + padding
      const newScale = Math.min(1, containerWidth / documentWidth);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full items-center" ref={containerRef}>
      <div className="w-full flex-1 overflow-auto bg-surface-200/50 dark:bg-surface-950/50 rounded-2xl p-4 sm:p-8 flex justify-center custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: scale }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="shadow-2xl bg-white origin-top shrink-0"
            style={{
              width: '794px', // Standard A4 width in pixels
              minHeight: '1123px', // Standard A4 height in pixels
            }}
          >
            <div id="resume-preview" className="w-full h-full overflow-hidden">
              <TemplateComponent data={formData} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumePreview;
