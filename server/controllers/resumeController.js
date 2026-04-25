const Resume = require('../models/Resume');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res, next) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user._id,
    };

    const resume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all resumes for current user
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Ownership check
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume',
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Ownership check
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resume',
      });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Ownership check
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resume',
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forward resume link to email
// @route   POST /api/resumes/forward/:id
// @access  Private
exports.forwardResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Ownership check
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume',
      });
    }

    const user = await User.findById(req.user._id);
    const emailToForward = req.body.email || user.email;

    const directLink = `${req.protocol}://${req.get('host')}/builder/${resume._id}`;
    
    const message = `
      Hello ${user.name},

      You have requested to forward your resume link.
      
      Resume Title: ${resume.title || 'Untitled Resume'}
      Direct Link: ${directLink}

      Best regards,
      ResumeForge Automation Team
    `;

    await sendEmail({
      email: emailToForward,
      subject: `Direct Link: ${resume.title || 'Untitled Resume'}`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Resume link forwarded to ${emailToForward}`,
    });
  } catch (error) {
    next(error);
  }
};

