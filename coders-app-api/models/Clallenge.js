// models/Challenge.js
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  manager:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
