import React from 'react';
import { motion } from 'framer-motion';

const VIPIntroAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div 
        animate={{
          background: [
            "linear-gradient(to bottom right, #2563eb, #9333ea, #4f46e5)",
            "linear-gradient(to bottom right, #4f46e5, #2563eb, #9333ea)",
            "linear-gradient(to bottom right, #9333ea, #4f46e5, #2563eb)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      />

      {/* Decorative Glow Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-blue-400 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-500 rounded-full blur-[70px] md:blur-[140px] pointer-events-none"
      />

      {/* Main Logo Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* VIP Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: [0, 1.15, 1], rotate: [-10, 0] }}
          transition={{ 
            duration: 1.2, 
            times: [0, 0.7, 1],
            ease: "backOut" 
          }}
          className="w-36 h-36 md:w-48 md:h-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-10 relative overflow-hidden group"
        >
          {/* Inner Gloss Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          
          {/* Refined Advance Level RB SVG Logo */}
          <svg
            viewBox="0 0 120 100"
            className="w-28 h-28 md:w-36 md:h-36 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#ffffff" />
                <animate 
                  attributeName="x1" 
                  values="0%;100%;0%" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </linearGradient>
              
              <filter id="glowLayer" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Letter R - Stylish Redesign */}
            <motion.path
              d="M20 75V25H45C55 25 55 45 45 45H20M38 45C45 45 55 45 55 75"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-20 blur-[7px]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 75V25H45C55 25 55 45 45 45H20M38 45C45 45 55 45 55 75"
              stroke="url(#logoGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                pathLength: { duration: 1.5, delay: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.3 }
              }}
            />
            {/* Tracer Dot for R */}
            <motion.circle
              r="2.5"
              fill="white"
              filter="url(#glowLayer)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                cx: [20, 20, 45, 45, 20, 38, 55],
                cy: [75, 25, 25, 45, 45, 45, 75]
              }}
              transition={{ 
                duration: 2.2, 
                delay: 0.5, 
                ease: "easeInOut",
                times: [0, 0.1, 0.4, 0.6, 0.75, 0.85, 1]
              }}
            />

            {/* Letter B - Stylish Redesign */}
            <motion.path
              d="M70 75V25H90C100 25 100 45 90 45H70M70 45H95C105 45 105 75 95 75H70"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-15 blur-[7px]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M70 75V25H90C100 25 100 45 90 45H70M70 45H95C105 45 105 75 95 75H70"
              stroke="url(#logoGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ 
                pathLength: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.5 }
              }}
            />
            {/* Tracer Dot for B */}
            <motion.circle
              r="2.5"
              fill="white"
              filter="url(#glowLayer)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                cx: [70, 70, 90, 90, 70, 95, 95, 70],
                cy: [75, 25, 25, 45, 45, 45, 75, 75]
              }}
              transition={{ 
                duration: 2.2, 
                delay: 0.8, 
                ease: "easeInOut",
                times: [0, 0.1, 0.35, 0.5, 0.65, 0.8, 0.95, 1]
              }}
            />
          </svg>
          
          {/* Rotating Outer Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] border-2 border-dashed border-white/20 rounded-full"
          />
          
          {/* Pulsing Light Effect */}
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white rounded-full"
          />
        </motion.div>

        {/* VIP Text Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
            Resume Builder
          </h1>
          <p className="text-white/70 text-lg md:text-2xl font-light tracking-wide uppercase">
            Build Your Professional Resume
          </p>
        </motion.div>
      </div>

      {/* Premium Progress Loader */}
      <div className="absolute bottom-12 w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
        />
      </div>
    </motion.div>
  );
};

export default VIPIntroAnimation;
