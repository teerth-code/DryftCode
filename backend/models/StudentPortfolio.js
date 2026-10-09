const mongoose = require('mongoose');

const StudentPortfolioSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  portfolioTitle: {
    type: String,
    default: 'My Hackathon Portfolio'
  },
  portfolioDescription: String,
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortfolioEntry'
  }],
  totalVerifications: {
    type: Number,
    default: 0
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  portfolioUrl: String
}, { timestamps: true });

module.exports = mongoose.model('StudentPortfolio', StudentPortfolioSchema);
