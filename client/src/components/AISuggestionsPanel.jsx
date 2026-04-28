import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiInfo, FiZap, FiCheckCircle } from 'react-icons/fi';

const AISuggestionsPanel = ({ 
  isOpen, 
  onClose, 
  suggestions, 
  score, 
  onAccept, 
  onAcceptAll,
  isApplying
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-surface-900 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between bg-primary-600 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiZap className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display">AI Analysis</h2>
                  <p className="text-primary-100 text-xs font-medium uppercase tracking-wider">Llama 3 Powered Suggestions</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Score Section */}
            <div className="p-8 bg-surface-50 dark:bg-surface-950/50 border-b border-surface-200 dark:border-surface-800 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-200 dark:text-surface-800 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <motion.circle
                    className="text-primary-600 stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{ strokeDasharray: `${(score / 100) * 251.2} 251.2` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  ></motion.circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-surface-900 dark:text-white">{score}</span>
                  <span className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">Score</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">
                  {score >= 80 ? 'Excellent Resume!' : score >= 60 ? 'Good, but room to improve' : 'Needs significant work'}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  We found {suggestions.length} potential improvements.
                </p>
              </div>
            </div>

            {/* Suggestions List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
              {suggestions.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-surface-400">Suggestions</span>
                    <button 
                      onClick={onAcceptAll}
                      className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
                    >
                      <FiCheckCircle className="w-3.5 h-3.5" /> Accept All
                    </button>
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700/50 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">
                          {suggestion.section}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-surface-400 font-bold italic">
                          <FiInfo className="w-3 h-3" /> Improvement
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-surface-400 block mb-1">Original</span>
                          <p className="text-sm text-surface-500 dark:text-surface-400 line-through decoration-red-400/50 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg italic">
                            {suggestion.original}
                          </p>
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 block mb-1">Suggested</span>
                          <p className="text-sm text-surface-900 dark:text-white font-medium bg-emerald-50 dark:bg-emerald-900/10 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                            {suggestion.improved}
                          </p>
                        </div>
                        <div className="pt-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary-500 block mb-1">Why?</span>
                          <p className="text-[11px] text-surface-600 dark:text-surface-400 italic">
                            "{suggestion.reason}"
                          </p>
                        </div>
                        <button
                          onClick={() => onAccept(suggestion)}
                          className="w-full mt-2 py-2.5 bg-surface-900 dark:bg-white text-white dark:text-surface-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                          <FiCheck className="w-4 h-4" /> Accept Suggestion
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">You're All Set!</h3>
                  <p className="text-sm text-surface-500">Your resume is already highly optimized. No critical improvements needed.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
              <button 
                onClick={onAcceptAll}
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={suggestions.length === 0}
              >
                <FiZap className="w-5 h-5" /> Accept All {suggestions.length} Improvements
              </button>
              <p className="text-[10px] text-center text-surface-400 mt-4 font-medium uppercase tracking-widest">
                Updates will be applied immediately to your resume
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AISuggestionsPanel;
