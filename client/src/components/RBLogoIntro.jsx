import React from 'react';
import { motion } from 'framer-motion';

const RBLogoIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Gradient Background */}
      <motion.div 
        animate={{
          background: [
            "linear-gradient(to bottom right, #0f172a, #581c87, #312e81)",
            "linear-gradient(to bottom right, #312e81, #0f172a, #581c87)",
            "linear-gradient(to bottom right, #581c87, #312e81, #0f172a)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Cinematic Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -15, boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
          animate={{ 
            scale: [0, 1.4, 1], 
            rotate: [-15, 0],
            boxShadow: [
              "0px 0px 0px rgba(255,255,255,0)",
              "0px 0px 50px rgba(255,255,255,0.3)",
              "0px 0px 30px rgba(255,255,255,0.2)"
            ]
          }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.7, 1],
            ease: "easeOut" 
          }}
          className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 relative"
        >
          {/* Pulsing Highlight Animation (Plays once after reveal) */}
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0, 0.5, 0] }}
            transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
            className="absolute inset-[-10px] bg-white rounded-full blur-md"
          />

          {/* Logo Text */}
          <span className="text-4xl md:text-5xl font-black bg-gradient-to-br from-slate-900 to-indigo-900 bg-clip-text text-transparent">
            RB
          </span>
        </motion.div>

        {/* Text Animation: Slide up + Fade in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">
            Resume Builder
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2, duration: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
          />
        </motion.div>
      </div>

      {/* Decorative Particle Glow */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"
      />
    </motion.div>
  );
};

export default RBLogoIntro;
