import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiFileText, FiLayout, FiDownload, FiZap, FiArrowRight, FiStar, FiShield, FiMail } from 'react-icons/fi';

const ElegantBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#6378ff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.21, 0.45, 0.32, 0.9] },
  }),
};

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const heroContent = document.getElementById('hero-content');
    if (heroContent && heroContent.contains(e.target)) {
      const rect = heroContent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    }
  };

  const features = [
    { icon: FiFileText, title: 'Intelligent Builder', desc: 'Craft professional resumes with a clean, distraction-free interface and real-time guidance.', video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-a-code-4441-large.mp4' },
    { icon: FiLayout, title: 'Artisan Templates', desc: 'Selection of high-end, ATS-optimized templates designed by industry experts for maximum impact.', video: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-coffee-shop-4268-large.mp4' },
    { icon: FiDownload, title: 'Premium Exports', desc: 'Generate pixel-perfect PDF documents ready for high-stakes applications and printing.', video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-typing-on-a-laptop-4833-large.mp4' },
    { icon: FiZap, title: 'Effortless Flow', desc: 'Experience a streamlined workflow that respects your time and focuses on your achievements.', video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-blue-eye-1124-large.mp4' },
    { icon: FiStar, title: 'Modern Aesthetics', desc: 'Elevate your professional image with a resume that reflects modern design standards.', video: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-blue-smoke-on-a-black-background-4775-large.mp4' },
    { icon: FiShield, title: 'Privacy First', desc: 'Your professional data is handled with the highest security standards and total privacy.', video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-and-white-circuit-board-4458-large.mp4' },
    { icon: FiMail, title: 'Direct Forwarding', desc: 'Automatically forward your resume link to any Gmail address for instant professional outreach.', video: 'https://assets.mixkit.co/videos/preview/mixkit-envelope-icon-animation-4330-large.mp4' },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-surface-50 dark:bg-surface-950" 
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Noise Texture Overlay for Artisanal Feel */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      <ElegantBackground />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 sm:pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-600/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <motion.div 
          id="hero-content"
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.21, 0.45, 0.32, 0.9)' }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
          }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 mb-10 shadow-classic"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-surface-600 dark:text-surface-400 font-black">Professional Artisan Edition</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-8xl lg:text-9xl font-display font-black text-surface-900 dark:text-white leading-[0.95] sm:leading-[0.9] tracking-tighter mb-10"
          >
            The Art of the <br />
            <span className="text-primary-600 dark:text-primary-500">Professional Story</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-xl sm:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
          >
            Craft an authoritative career narrative with our artisan-designed templates. 
            Engineered for high-stakes leadership and world-class roles.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group px-10 py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-classic hover:bg-primary-500 transition-all flex items-center gap-2"
              >
                Start Building Free
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-2xl bg-white dark:bg-surface-800 text-surface-900 dark:text-white font-bold text-lg shadow-sm border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-all"
              >
                View Templates
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-20 grid grid-cols-3 gap-4 sm:gap-12 max-w-2xl mx-auto"
            style={{ transform: 'translateZ(40px)' }}
          >
            {[
              { value: '15K+', label: 'Resumes Built' },
              { value: '4', label: 'Pro Templates' },
              { value: '100%', label: 'Free Access' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-3xl sm:text-4xl font-display font-black text-primary-600 dark:text-primary-500 mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 group-hover:text-surface-600 transition-colors">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - Hidden on most screens to prevent RWD overlap */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden 2xl:flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-surface-400 dark:text-surface-600 font-bold">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-surface-200 dark:border-surface-800 flex items-start justify-center pt-2">
            <motion.div 
              animate={{ height: [8, 16, 8], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 rounded-full bg-primary-500" 
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white dark:bg-surface-900 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-surface-900 dark:text-white mb-6">
              Precision Crafted <span className="text-primary-600">Features</span>
            </h2>
            <p className="text-surface-500 dark:text-surface-400 text-xl max-w-2xl mx-auto font-medium">
              Everything you need to showcase your professional excellence in a way that resonates with employers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-3xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 hover:shadow-classic hover:bg-white dark:hover:bg-surface-800 transition-all duration-500 group cursor-pointer overflow-hidden"
              >
                {/* Hover Video */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <video
                    src={feature.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-white/80 dark:bg-surface-900/80 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-500">{feature.title}</h3>
                  <p className="text-surface-500 dark:text-surface-400 leading-relaxed font-medium group-hover:text-surface-700 dark:group-hover:text-surface-200 transition-colors duration-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-surface-900 dark:bg-surface-950" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-display font-bold text-white mb-8"
          >
            Ready to Redefine Your <br />
            <span className="text-primary-500">Professional Identity?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-surface-400 text-xl mb-12 font-medium max-w-2xl mx-auto"
          >
            Join a community of elite professionals who use ResumeForge to navigate their career paths with confidence.
          </motion.p>
          <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-2xl bg-primary-600 text-white font-bold text-xl shadow-classic hover:bg-primary-500 transition-all"
            >
              Start Building Your Future
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 relative z-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-display font-bold text-surface-900 dark:text-white">ResumeForge</span>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-500 font-medium">
            © {new Date().getFullYear()} ResumeForge. All rights reserved. Professionalism redefined.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
