import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiFileText, FiLayout, FiDownload, FiZap, FiArrowRight, FiStar, FiShield } from 'react-icons/fi';

const MirrorFluidBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dots = [];
    const spacing = 40;
    const radius = 1.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots.length = 0;
      for (let x = spacing / 2; x < canvas.width; x += spacing) {
        for (let y = spacing / 2; y < canvas.height; y += spacing) {
          dots.push({ x, y, baseX: x, baseY: y });
        }
      }
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { x: mx, y: my } = mouse.current;
      const mirrorX = canvas.width - mx; // Mirror X position

      dots.forEach(dot => {
        // Distance from actual mouse
        const dx1 = mx - dot.baseX;
        const dy1 = my - dot.baseY;
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        // Distance from mirrored mouse
        const dx2 = mirrorX - dot.baseX;
        const dy2 = my - dot.baseY;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const maxDist = 150;
        let force = 0;
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (dist1 < maxDist) {
          force = (maxDist - dist1) / maxDist;
          targetX -= (dx1 / dist1) * force * 40;
          targetY -= (dy1 / dist1) * force * 40;
        }

        if (dist2 < maxDist) {
          force = (maxDist - dist2) / maxDist;
          targetX -= (dx2 / dist2) * force * 40;
          targetY -= (dy2 / dist2) * force * 40;
        }

        // Smooth transition
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;

        // Draw dot
        const opacity = Math.max(0.1, force * 0.8);
        ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius + (force * 2), 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connection lines if close
        if (force > 0.4) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${force * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(dot.baseX, dot.baseY);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />;
};

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
  const [isHovered, setIsHovered] = useState(false);

  // Cursor motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Snappy spring for the pointer (Accuracy)
  const pointerXSpring = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const pointerYSpring = useSpring(cursorY, { stiffness: 1000, damping: 40 });
  
  // Fluid spring for the spotlight (Aesthetics)
  const spotlightXSpring = useSpring(cursorX, { stiffness: 150, damping: 30 });
  const spotlightYSpring = useSpring(cursorY, { stiffness: 150, damping: 30 });

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // If hovering the hero content, apply 3D tilt
    const heroContent = document.getElementById('hero-content');
    if (heroContent && heroContent.contains(e.target)) {
      const rect = heroContent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    }
  };

  const features = [
    { icon: FiFileText, title: 'Smart Resume Builder', desc: 'Intuitive form with real-time preview. Fill in your details and watch your resume come alive instantly.' },
    { icon: FiLayout, title: 'Premium Templates', desc: 'Choose from beautifully crafted templates — Classic, Modern, and Minimal — designed for every industry.' },
    { icon: FiDownload, title: 'PDF Download', desc: 'Download your polished resume as a high-quality PDF file, ready to send to employers.' },
    { icon: FiZap, title: 'Lightning Fast', desc: 'No bloat, no delays. Build your resume in minutes with our streamlined, responsive interface.' },
    { icon: FiStar, title: 'Live Preview', desc: 'See changes in real-time with our split-screen editor. What you type is what you get.' },
    { icon: FiShield, title: 'Secure & Private', desc: 'Your data is protected with industry-standard encryption and never shared with third parties.' },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MirrorFluidBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <motion.div 
          id="hero-content"
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
            e.currentTarget.style.transition = 'transform 0.5s ease-out';
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = 'none';
          }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-300 font-medium mb-8"
            style={{ transform: 'translateZ(50px)' }}
          >
            <FiZap className="w-4 h-4" />
            Build your dream resume in minutes
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ transform: 'translateZ(100px)' }}
          >
            Craft Resumes That
            <br />
            <span className="text-gradient">Get You Hired</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl text-surface-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ transform: 'translateZ(60px)' }}
          >
            ResumeForge helps you build stunning, ATS-friendly resumes with live preview, 
            premium templates, and instant PDF download. Stand out from the crowd.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ transform: 'translateZ(80px)' }}
          >
            <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
              <motion.button
                whileHover={{ scale: 1.05, translateZ: 20 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-xl gradient-primary text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-shadow flex items-center gap-2"
              >
                Get Started Free
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.05, translateZ: 20 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Templates
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            style={{ transform: 'translateZ(40px)' }}
          >
            {[
              { value: '10K+', label: 'Resumes Built' },
              { value: '4', label: 'Pro Templates' },
              { value: '100%', label: 'Free to Use' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs sm:text-sm text-surface-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

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
      <section className="py-24 bg-white dark:bg-surface-900 relative z-20">
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-7 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group cursor-pointer"
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
      <section className="py-24 relative overflow-hidden z-20">
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
      <footer className="py-8 bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 relative z-20">
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
