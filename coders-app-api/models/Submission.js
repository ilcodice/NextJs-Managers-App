const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  coder:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge:    { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  code:         { type: String, required: true },
  submitted_at: { type: Date, default: Date.now },
  passed:       { type: Boolean, default: false },
  score:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
