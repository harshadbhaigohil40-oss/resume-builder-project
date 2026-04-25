import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass rounded-3xl p-10 shadow-2xl border border-white/5">
          {/* Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-classic group-hover:bg-primary-500 transition-all duration-300">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
            </Link>
            <h1 className="text-3xl font-display font-black text-white mb-3">Welcome Back</h1>
            <p className="text-surface-400 font-medium">Continue your professional journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-surface-300 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-300 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 transition-all font-medium"
                />
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-classic hover:bg-primary-500 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-surface-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
