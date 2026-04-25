import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PremiumIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-surface-950 flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" }
              }}
              className="w-20 h-20 rounded-2xl bg-primary-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] mb-6"
            >
              <span className="text-white font-black text-4xl">R</span>
            </motion.div>

            {/* Brand Name */}
            <div className="overflow-hidden mt-6">
              <motion.h1
                initial={{ y: 50, opacity: 0, filter: 'blur(10px)', letterSpacing: '0.2em' }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  filter: 'blur(0px)',
                  letterSpacing: '0em',
                  transition: { delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }}
                className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight"
              >
                Resume<span className="text-primary-500">Forge</span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: { delay: 1.5, duration: 1, ease: "easeOut" }
              }}
              className="mt-6 flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="text-[11px] uppercase tracking-[0.5em] text-surface-400 font-bold whitespace-nowrap">
                Artisan Career Crafting
              </span>
              <div className="h-[1px] w-12 bg-white/10" />
            </motion.div>

            {/* Subtle Progress Bar */}
            <div className="mt-16 w-64 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
              />
            </div>
          </div>

          {/* Decorative background gradients */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumIntro;
