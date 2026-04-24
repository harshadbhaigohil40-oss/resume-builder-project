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
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="flex-1 overflow-auto bg-surface-200/50 dark:bg-surface-950/50 rounded-2xl p-4 sm:p-8 custom-scrollbar flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="shadow-2xl overflow-hidden bg-white shrink-0 origin-top"
            style={{
              width: '210mm',
              minHeight: '297mm',
              transform: `scale(${scale})`,
              marginBottom: `-${(1 - scale) * 100}%` // Offset the white space created by scale
            }}
          >
            <div id="resume-preview" className="w-full h-full">
              <TemplateComponent data={formData} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumePreview;
