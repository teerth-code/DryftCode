const StudentPortfolio = require('../models/StudentPortfolio');
const PortfolioEntry = require('../models/PortfolioEntry');
const Badge = require('../models/Badge');
const User = require('../models/User');

exports.getMyPortfolio = async (req, res) => {
  try {
    const studentId = req.user.id;

    let portfolio = await StudentPortfolio.findOne({ student: studentId })
      .populate({
        path: 'entries',
        populate: [
          { path: 'submission' },
          { path: 'hackathon', select: 'name startDate' }
        ]
      })
      .populate('badges');

    if (!portfolio) {
      portfolio = new StudentPortfolio({
        student: studentId
      });
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStudentPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const portfolio = await StudentPortfolio.findOne({ student: userId })
      .populate({
        path: 'entries',
        populate: [
          { path: 'submission' },
          { path: 'hackathon', select: 'name startDate' }
        ]
      })
      .populate('badges');

    if (!portfolio || !portfolio.isPublic) {
      return res.status(403).json({ message: 'Portfolio not found or not public' });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePortfolioSettings = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { portfolioTitle, portfolioDescription, isPublic } = req.body;

    let portfolio = await StudentPortfolio.findOne({ student: studentId });
    if (!portfolio) {
      portfolio = new StudentPortfolio({ student: studentId });
    }

    if (portfolioTitle) portfolio.portfolioTitle = portfolioTitle;
    if (portfolioDescription) portfolio.portfolioDescription = portfolioDescription;
    if (isPublic !== undefined) portfolio.isPublic = isPublic;

    await portfolio.save();

    res.json({
      message: 'Portfolio updated successfully',
      portfolio
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyBadges = async (req, res) => {
  try {
    const studentId = req.user.id;

    const badges = await Badge.find({ student: studentId })
      .populate('submission');

    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPortfolioEntries = async (req, res) => {
  try {
    const studentId = req.user.id;

    const portfolio = await StudentPortfolio.findOne({ student: studentId });
    if (!portfolio) {
      return res.json({ entries: [] });
    }

    const entries = await PortfolioEntry.find({ portfolio: portfolio._id })
      .populate('submission')
      .populate('hackathon', 'name startDate description');

    res.json({ entries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
