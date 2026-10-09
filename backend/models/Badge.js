const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badgeType: {
    type: String,
    enum: ['first-submission', 'first-win', 'hackathon-veteran', 'team-leader', 'technical-excellence'],
    required: true
  },
  badgeName: String,
  badgeDescription: String,
  badgeIcon: String,
  awardedAt: {
    type: Date,
    default: Date.now
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }
}, { timestamps: true });

module.exports = mongoose.model('Badge', BadgeSchema);
