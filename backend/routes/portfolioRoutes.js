const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const portfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.get('/me', authenticateToken, portfolioController.getMyPortfolio);
router.get('/entries', authenticateToken, portfolioController.getPortfolioEntries);
router.patch('/settings', authenticateToken, portfolioController.updatePortfolioSettings);
router.get('/badges', authenticateToken, portfolioController.getMyBadges);

router.get('/:userId', portfolioController.getStudentPortfolio);

module.exports = router;
