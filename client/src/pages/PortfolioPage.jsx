import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
// Add other templates as needed
// import ModernTemplate from '../templates/ModernTemplate';

const PortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setResumeColor } = useTheme();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/portfolio/${username}`);
        setPortfolio(res.data.data);
        
        // If portfolio has a custom theme color, apply it
        if (res.data.data.themeColor) {
          setResumeColor(res.data.data.themeColor);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Portfolio not found or is private');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username, setResumeColor]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-900 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">{error}</p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const { resumeId: resume, userId: user } = portfolio;

  // Render the appropriate template
  const renderTemplate = () => {
    const props = { resumeData: resume };
    switch (resume.template) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      // case 'modern': return <ModernTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-100 dark:bg-surface-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-sm border border-surface-200 dark:border-surface-700"
        >
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{user.name}'s Portfolio</h1>
              <p className="text-surface-500 dark:text-surface-400">View my professional resume</p>
            </div>
          </div>
          
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors font-medium"
          >
            Print/Download PDF
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl overflow-hidden print:shadow-none print:m-0"
        >
          {/* Resume Container */}
          <div className="w-full h-full p-8 md:p-12 print:p-0 bg-white">
            <div className="origin-top scale-100 sm:scale-100 max-w-[210mm] mx-auto min-h-[297mm]">
               {renderTemplate()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;
