const mongoose = require('mongoose');

const PortfolioEntrySchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentPortfolio',
    required: true
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true
  },
  hackathonName: String,
  hackathonDate: Date,
  projectName: String,
  description: String,
  techStack: [String],
  githubLink: String,
  demoLink: String,
  track: String,
  isWinner: {
    type: Boolean,
    default: false
  },
  winnerTrack: String,
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  certificateId: String,
  certificateUrl: String,
  verifiedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('PortfolioEntry', PortfolioEntrySchema);
