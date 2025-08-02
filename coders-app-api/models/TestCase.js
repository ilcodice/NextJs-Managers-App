const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  challenge:      { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  weight:         { type: Number, min: 0, max: 1, required: true },
  expected_output:{ type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

module.exports = mongoose.model('TestCase', testCaseSchema);
