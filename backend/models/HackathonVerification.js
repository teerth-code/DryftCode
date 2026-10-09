const mongoose = require('mongoose');

const HackathonVerificationSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true,
    unique: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedAt: Date,
  certificateId: String,
  certificateUrl: String
}, { timestamps: true });

module.exports = mongoose.model('HackathonVerification', HackathonVerificationSchema);
