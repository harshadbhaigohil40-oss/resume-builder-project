import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiLogOut, FiUser } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-classic group-hover:bg-primary-500 transition-all duration-300">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-display font-bold text-surface-900 dark:text-white leading-tight">
                Resume<span className="text-primary-600 dark:text-primary-400">Forge</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-surface-400 dark:text-surface-500 font-medium">Professional Builder</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" active={isActive('/dashboard')}>
                  Dashboard
                </NavLink>
                <NavLink to="/templates" active={isActive('/templates')}>
                  Templates
                </NavLink>
                <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-2" />
                <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                  {user?.avatar ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.avatar}`} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-md object-cover"
                    />
                  ) : (
                    <FiUser className="w-4 h-4 text-primary-500" />
                  )}
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-200">
                    {user?.name}
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <NavLink to="/login" active={isActive('/login')}>
                  Login
                </NavLink>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-classic hover:bg-primary-500 transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="ml-2 p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300"
            >
              {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-white dark:bg-surface-900"
        >
          <div className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <MobileLink to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</MobileLink>
                <MobileLink to="/templates" onClick={() => setMobileOpen(false)}>Templates</MobileLink>
                <MobileLink to="/profile" onClick={() => setMobileOpen(false)}>Profile</MobileLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileLink to="/login" onClick={() => setMobileOpen(false)}>Login</MobileLink>
                <MobileLink to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</MobileLink>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
    }`}
  >
    {children}
  </Link>
);

const MobileLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2.5 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
