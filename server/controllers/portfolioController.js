const Portfolio = require('../models/Portfolio');
const Resume = require('../models/Resume');
const User = require('../models/User');

// @desc    Get portfolio by username (Public)
// @route   GET /api/portfolio/:username
// @access  Public
exports.getPortfolioByUsername = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ username: req.params.username })
      .populate({
        path: 'resumeId',
        select: '-__v'
      })
      .populate({
        path: 'userId',
        select: 'name avatar'
      });

    if (!portfolio || !portfolio.isPublic) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or is private'
      });
    }

    // Increment views
    portfolio.views += 1;
    await portfolio.save();

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update portfolio (Private)
// @route   POST /api/portfolio
// @access  Private
exports.createOrUpdatePortfolio = async (req, res, next) => {
  try {
    const { username, resumeId, themeColor, isPublic } = req.body;

    // Check if username is already taken by another user
    const existingUsername = await Portfolio.findOne({ username });
    if (existingUsername && existingUsername.userId.toString() !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    // Check if resume exists and belongs to user
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (portfolio) {
      // Update existing
      portfolio.username = username || portfolio.username;
      portfolio.resumeId = resumeId || portfolio.resumeId;
      portfolio.themeColor = themeColor || portfolio.themeColor;
      if (isPublic !== undefined) portfolio.isPublic = isPublic;
      
      await portfolio.save();
    } else {
      // Create new
      portfolio = await Portfolio.create({
        userId: req.user.id,
        username,
        resumeId,
        themeColor,
        isPublic: isPublic !== undefined ? isPublic : true
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's own portfolio settings
// @route   GET /api/portfolio/me
// @access  Private
exports.getMyPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'No portfolio found for this user'
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};
