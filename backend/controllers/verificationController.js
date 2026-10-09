const HackathonVerification = require('../models/HackathonVerification');
const Submission = require('../models/Submission');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');
const PortfolioEntry = require('../models/PortfolioEntry');
const StudentPortfolio = require('../models/StudentPortfolio');
const Badge = require('../models/Badge');

exports.organizerConfirmSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { status, verificationNotes } = req.body;
    const organizerId = req.user.id;

    const organizer = await User.findById(organizerId);
    if (organizer.role !== 'ORGANIZER' && organizer.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only organizers can verify submissions' });
    }

    const submission = await Submission.findById(submissionId).populate('hackathon');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.hackathon.organizer.toString() !== organizerId) {
      return res.status(403).json({ message: 'Not authorized to verify this submission' });
    }

    let verification = await HackathonVerification.findOne({ submission: submissionId });
    
    if (!verification) {
      verification = new HackathonVerification({
        submission: submissionId,
        organizer: organizerId,
        status,
        verificationNotes
      });
    } else {
      verification.status = status;
      verification.verificationNotes = verificationNotes;
    }

    if (status === 'verified') {
      verification.verifiedAt = new Date();
      verification.certificateId = `CERT-${submissionId}-${Date.now()}`;
      verification.certificateUrl = `/certificates/${verification.certificateId}`;
    }

    await verification.save();

    res.json({
      message: 'Submission verified successfully',
      verification
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getVerificationStatus = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const verification = await HackathonVerification.findOne({ submission: submissionId })
      .populate('submission')
      .populate('organizer', 'name email');

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found', status: 'pending' });
    }

    res.json(verification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addToPortfolio = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const studentId = req.user.id;

    const user = await User.findById(studentId);
    if (user.role !== 'STUDENT') {
      return res.status(403).json({ message: 'Only students can add to portfolio' });
    }

    const submission = await Submission.findById(submissionId).populate('hackathon');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.submittedBy.toString() !== studentId) {
      return res.status(403).json({ message: 'Can only add own submissions to portfolio' });
    }

    const verification = await HackathonVerification.findOne({ submission: submissionId });
    if (!verification || verification.status !== 'verified') {
      return res.status(400).json({ message: 'Submission must be verified before adding to portfolio' });
    }

    let portfolio = await StudentPortfolio.findOne({ student: studentId });
    if (!portfolio) {
      portfolio = new StudentPortfolio({
        student: studentId
      });
      await portfolio.save();
    }

    const existingEntry = await PortfolioEntry.findOne({
      portfolio: portfolio._id,
      submission: submissionId
    });
    if (existingEntry) {
      return res.status(400).json({ message: 'Submission already in portfolio' });
    }

    const entry = new PortfolioEntry({
      portfolio: portfolio._id,
      submission: submissionId,
      hackathon: submission.hackathon._id,
      hackathonName: submission.hackathon.name,
      hackathonDate: submission.hackathon.startDate,
      projectName: submission.projectName,
      description: submission.description,
      techStack: submission.techStack,
      githubLink: submission.githubLink,
      demoLink: submission.demoLink,
      track: submission.track,
      isWinner: submission.isWinner,
      winnerTrack: submission.winnerTrack,
      verificationStatus: 'verified',
      certificateId: verification.certificateId,
      certificateUrl: verification.certificateUrl,
      verifiedAt: verification.verifiedAt
    });

    await entry.save();

    portfolio.entries.push(entry._id);
    portfolio.totalVerifications = portfolio.entries.length;
    await portfolio.save();

    if (portfolio.entries.length === 1) {
      const badge = new Badge({
        student: studentId,
        badgeType: 'first-submission',
        badgeName: 'First Submission Verified',
        badgeDescription: 'Your first hackathon submission has been verified!',
        submission: submissionId
      });
      await badge.save();
      portfolio.badges.push(badge._id);
      await portfolio.save();
    }

    if (submission.isWinner && !await Badge.findOne({ student: studentId, badgeType: 'first-win' })) {
      const badge = new Badge({
        student: studentId,
        badgeType: 'first-win',
        badgeName: 'First Win',
        badgeDescription: 'Congratulations on your first hackathon win!',
        submission: submissionId
      });
      await badge.save();
      portfolio.badges.push(badge._id);
      await portfolio.save();
    }

    res.json({
      message: 'Submission added to portfolio successfully',
      entry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeFromPortfolio = async (req, res) => {
  try {
    const { entryId } = req.params;
    const studentId = req.user.id;

    const entry = await PortfolioEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ message: 'Portfolio entry not found' });
    }

    const portfolio = await StudentPortfolio.findById(entry.portfolio);
    if (portfolio.student.toString() !== studentId) {
      return res.status(403).json({ message: 'Not authorized to remove this entry' });
    }

    portfolio.entries = portfolio.entries.filter(e => e.toString() !== entryId);
    portfolio.totalVerifications = portfolio.entries.length;
    await portfolio.save();

    await PortfolioEntry.findByIdAndDelete(entryId);

    res.json({ message: 'Entry removed from portfolio' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
