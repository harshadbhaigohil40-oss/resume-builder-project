import React from 'react';

const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  error, 
  required,
  className = '',
  name
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-surface-500 dark:text-surface-400 ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-surface-50 dark:bg-surface-800/50
          border-2 transition-all duration-200
          text-surface-900 dark:text-white placeholder:text-surface-400
          outline-none
          ${error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-surface-200 dark:border-surface-700 focus:border-primary-500 dark:focus:border-primary-400'
          }
        `}
      />
      {error && <span className="text-[10px] font-bold text-red-500 mt-0.5 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
