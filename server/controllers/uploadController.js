const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// @desc    Upload profile photo
// @route   POST /api/auth/upload-avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Delete old avatar file if it exists and isn't the default
    const user = await User.findById(req.user._id);
    if (user.avatar && user.avatar.startsWith('/uploads/')) {
      const oldPath = path.join(__dirname, '..', user.avatar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Build the public URL path
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Save to user document
    user.avatar = avatarUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};
