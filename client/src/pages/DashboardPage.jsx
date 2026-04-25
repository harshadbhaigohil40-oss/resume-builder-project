import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getResumes, deleteResume } from '../services/resumeService';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiFileText, FiTrendingUp } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      setResumes(data.resumes || []);
    } catch (err) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Resume deleted');
    } catch (err) {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-surface-50 dark:bg-surface-950">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-surface-900 dark:text-white leading-tight tracking-tight">
            Greetings, <span className="text-primary-600 dark:text-primary-500">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-4 text-lg font-medium max-w-2xl">
            Curate your professional narrative with our suite of executive-grade tools.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-[2rem] bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-classic group hover:border-primary-500/30 transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <FiFileText className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <p className="text-4xl font-display font-black text-surface-900 dark:text-white leading-none mb-1">{resumes.length}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-surface-400">Your Artifacts</p>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-[2rem] bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-classic group hover:border-emerald-500/30 transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <FiTrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-4xl font-display font-black text-surface-900 dark:text-white leading-none mb-1">Elite</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-surface-400">Template Access</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resume Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><LoadingSpinner text="Loading resumes..." /></div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard isNew />
            <AnimatePresence>
              {resumes.map((resume) => (
                <DashboardCard key={resume._id} resume={resume} onDelete={handleDelete} onUpdate={fetchResumes} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
