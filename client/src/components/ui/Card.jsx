import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : {}}
      className={`
        bg-white dark:bg-surface-800 
        border border-surface-200 dark:border-surface-700 
        rounded-2xl overflow-hidden
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
