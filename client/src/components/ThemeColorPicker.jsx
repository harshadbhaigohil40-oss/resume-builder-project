import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const PRESET_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#64748b', // Slate
  '#0ea5e9', // Sky
  '#d946ef', // Fuchsia
];

const ThemeColorPicker = () => {
  const { resumeColor, setResumeColor } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
        Resume Accent Color
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setResumeColor(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              resumeColor === color
                ? 'border-surface-900 dark:border-white shadow-md'
                : 'border-transparent hover:border-surface-300 dark:hover:border-surface-600'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          />
        ))}
        {/* Custom color picker fallback */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 transition-colors">
          <input
            type="color"
            value={resumeColor}
            onChange={(e) => setResumeColor(e.target.value)}
            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
            title="Custom Color"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeColorPicker;
