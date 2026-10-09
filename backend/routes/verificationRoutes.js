const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const verificationController = require('../controllers/verificationController');

const router = express.Router();

router.post('/organizer-confirm/:submissionId', authenticateToken, verificationController.organizerConfirmSubmission);

router.get('/status/:submissionId', verificationController.getVerificationStatus);

router.post('/add-to-portfolio/:submissionId', authenticateToken, verificationController.addToPortfolio);

router.delete('/remove-from-portfolio/:entryId', authenticateToken, verificationController.removeFromPortfolio);

module.exports = router;
