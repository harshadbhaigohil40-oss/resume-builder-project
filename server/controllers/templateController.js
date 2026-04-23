// @desc    Get all available templates
// @route   GET /api/templates
// @access  Public
exports.getTemplates = (req, res, next) => {
  try {
    // In a real application, you might fetch these from a database
    // For now, we return a hardcoded list of available templates
    const templates = [
      {
        id: 'classic',
        name: 'Classic Professional',
        description: 'A clean, traditional layout perfect for corporate roles.',
        thumbnail: '/templates/classic.png',
        isPremium: false,
      },
      {
        id: 'modern',
        name: 'Modern Creative',
        description: 'A two-column design with a modern touch for creative fields.',
        thumbnail: '/templates/modern.png',
        isPremium: false,
      },
      {
        id: 'minimal',
        name: 'Minimalist Clean',
        description: 'Focus on content with this elegant, minimal design.',
        thumbnail: '/templates/minimal.png',
        isPremium: false,
      },
      {
        id: 'stylish',
        name: 'Executive Stylish',
        description: 'Sophisticated layout designed for senior level positions.',
        thumbnail: '/templates/executive.png',
        isPremium: true,
      }
    ];

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    next(error);
  }
};
