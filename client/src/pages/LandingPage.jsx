import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiFileText, FiLayout, FiDownload, FiZap, FiArrowRight, FiStar, FiShield } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: FiFileText, title: 'Smart Resume Builder', desc: 'Intuitive form with real-time preview. Fill in your details and watch your resume come alive instantly.' },
    { icon: FiLayout, title: 'Premium Templates', desc: 'Choose from beautifully crafted templates — Classic, Modern, and Minimal — designed for every industry.' },
    { icon: FiDownload, title: 'PDF Download', desc: 'Download your polished resume as a high-quality PDF file, ready to send to employers.' },
    { icon: FiZap, title: 'Lightning Fast', desc: 'No bloat, no delays. Build your resume in minutes with our streamlined, responsive interface.' },
    { icon: FiStar, title: 'Live Preview', desc: 'See changes in real-time with our split-screen editor. What you type is what you get.' },
    { icon: FiShield, title: 'Secure & Private', desc: 'Your data is protected with industry-standard encryption and never shared with third parties.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-300 font-medium mb-8"
          >
            <FiZap className="w-4 h-4" />
            Build your dream resume in minutes
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
          >
            Craft Resumes That
            <br />
            <span className="text-gradient">Get You Hired</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl text-surface-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ResumeForge helps you build stunning, ATS-friendly resumes with live preview, 
            premium templates, and instant PDF download. Stand out from the crowd.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-xl gradient-primary text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-shadow flex items-center gap-2"
              >
                Get Started Free
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to={isAuthenticated ? '/templates' : '/login'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Templates
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: '10K+', label: 'Resumes Built' },
              { value: '3', label: 'Pro Templates' },
              { value: '100%', label: 'Free to Use' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs sm:text-sm text-surface-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-surface-500 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary-400" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-surface-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume quickly and easily.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-7 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-surface-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready to Build Your Resume?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-surface-300 text-lg mb-10"
          >
            Join thousands of professionals who landed their dream jobs with ResumeForge.
          </motion.p>
          <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl gradient-primary text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-shadow"
            >
              Start Building Now — It's Free
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-surface-500 dark:text-surface-500">
            © {new Date().getFullYear()} ResumeForge. Built with ❤️ for job seekers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
