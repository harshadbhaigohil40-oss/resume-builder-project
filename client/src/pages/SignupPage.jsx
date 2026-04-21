import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPw) return toast.error('Fill in all fields');
    if (password !== confirmPw) return toast.error('Passwords do not match');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  const inputCls = "w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md mx-4">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex mb-6"><div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow"><span className="text-white font-bold text-xl">R</span></div></Link>
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-surface-400 text-sm">Start building your professional resume</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-surface-300 mb-2">Full Name</label><div className="relative"><FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" /><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" className={inputCls}/></div></div>
            <div><label className="block text-sm font-medium text-surface-300 mb-2">Email</label><div className="relative"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" /><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className={inputCls}/></div></div>
            <div><label className="block text-sm font-medium text-surface-300 mb-2">Password</label><div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" /><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min. 6 characters" className={inputCls}/></div></div>
            <div><label className="block text-sm font-medium text-surface-300 mb-2">Confirm Password</label><div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" /><input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)} placeholder="Repeat password" className={inputCls}/></div></div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
              {loading ? <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"/> : <><span>Create Account</span><FiArrowRight className="w-4 h-4"/></>}
            </motion.button>
          </form>
          <p className="text-center text-sm text-surface-400 mt-6">Already have an account?{' '}<Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
