import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiSend } from 'react-icons/fi';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/forgotpassword', { email });
      if (res.data.success) {
        setSubmitted(true);
        if (res.data.devMode) {
          toast.success('Dev mode: Link generated!');
          console.log('Reset Link:', res.data.resetUrl);
          // Auto redirect or show link in dev
          setTimeout(() => {
             window.location.href = res.data.resetUrl;
          }, 2000);
        } else {
          toast.success('Reset link sent to your email');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-surface-400 hover:text-white transition-colors mb-6 text-sm">
              <FiArrowLeft /> Back to Login
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-surface-400 text-sm">
              {submitted 
                ? "Check your email for a reset link" 
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto">
                <FiMail className="w-10 h-10 text-primary-400" />
              </div>
              <p className="text-surface-300">
                We've sent an email to <span className="text-white font-semibold">{email}</span> with instructions to reset your password.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
