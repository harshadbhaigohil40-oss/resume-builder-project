import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import VIPIntroAnimation from './components/VIPIntroAnimation';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PortfolioPage from './pages/PortfolioPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import TemplatesPage from './pages/TemplatesPage';
import { useAuth } from './context/AuthContext';

// Page Transition Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      {children}
    </motion.div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <VIPIntroAnimation key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-white font-sans transition-colors duration-200 selection:bg-primary-500/30 selection:text-primary-900 dark:selection:text-primary-100">
        <Navbar />
        <BackToTop />
        <main className="relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
              <Route path="/templates" element={<PageWrapper><TemplatesPage /></PageWrapper>} />
              
              <Route path="/login" element={
                <PublicRoute>
                  <PageWrapper><LoginPage /></PageWrapper>
                </PublicRoute>
              } />
              
              <Route path="/signup" element={
                <PublicRoute>
                  <PageWrapper><SignupPage /></PageWrapper>
                </PublicRoute>
              } />

              <Route path="/forgot-password" element={
                <PublicRoute>
                  <PageWrapper><ForgotPasswordPage /></PageWrapper>
                </PublicRoute>
              } />

              <Route path="/reset-password/:token" element={
                <PublicRoute>
                  <PageWrapper><ResetPasswordPage /></PageWrapper>
                </PublicRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PageWrapper><DashboardPage /></PageWrapper>
                </ProtectedRoute>
              } />
              
              <Route path="/builder" element={
                <ProtectedRoute>
                  <PageWrapper><ResumeBuilderPage /></PageWrapper>
                </ProtectedRoute>
              } />
              
              <Route path="/builder/:id" element={
                <ProtectedRoute>
                  <PageWrapper><ResumeBuilderPage /></PageWrapper>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <PageWrapper><ProfilePage /></PageWrapper>
                </ProtectedRoute>
              } />

              <Route path="/portfolio/:username" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default App;
