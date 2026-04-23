import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiGithub, FiLinkedin, FiGlobe, FiCamera, FiSave, FiCheckCircle } from 'react-icons/fi';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user?.avatar ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.avatar}` : null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    website: user?.website || '',
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large (max 5MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('github', formData.github);
      data.append('linkedin', formData.linkedin);
      data.append('website', formData.website);
      
      if (fileInputRef.current?.files[0]) {
        data.append('avatar', fileInputRef.current.files[0]);
      }

      const res = await api.put('/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-surface-50 dark:bg-surface-900">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-3xl shadow-xl border border-surface-200 dark:border-surface-700 overflow-hidden"
        >
          <div className="h-32 gradient-primary" />
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start sm:flex-row gap-6">
              {/* Avatar Upload */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-surface-800 overflow-hidden bg-surface-100 dark:bg-surface-700 shadow-xl">
                  {preview ? (
                    <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-400">
                      <FiUser className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 rounded-xl bg-white dark:bg-surface-700 text-primary-500 shadow-lg border border-surface-100 dark:border-surface-600 hover:scale-110 transition-transform"
                >
                  <FiCamera className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex-1 text-center sm:text-left pt-2">
                <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-1">{user?.name}</h1>
                <p className="text-surface-500 dark:text-surface-400 flex items-center justify-center sm:justify-start gap-2">
                  <FiMail className="w-4 h-4" />
                  {user?.email}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-100 dark:border-surface-700 pb-2">
                  Basic Information
                </h3>
                <InputField
                  icon={FiUser}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                <div className="opacity-60 cursor-not-allowed">
                  <InputField
                    icon={FiMail}
                    label="Email Address"
                    value={user?.email}
                    disabled
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-100 dark:border-surface-700 pb-2">
                  Professional Links
                </h3>
                <InputField
                  icon={FiGithub}
                  label="GitHub URL"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
                <InputField
                  icon={FiLinkedin}
                  label="LinkedIn URL"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
                <InputField
                  icon={FiGlobe}
                  label="Website / Portfolio"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="md:col-span-2 pt-6 border-t border-surface-100 dark:border-surface-700 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow disabled:opacity-70 transition-all"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave className="w-5 h-5" />
                  )}
                  Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InputField = ({ icon: Icon, label, value, onChange, placeholder, name, type = 'text', disabled = false }) => (
  <div>
    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-primary-500 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all disabled:opacity-100"
      />
    </div>
  </div>
);

export default ProfilePage;
