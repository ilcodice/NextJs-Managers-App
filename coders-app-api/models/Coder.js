// models/Coder.js
const mongoose = require('mongoose');

const coderSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  description: { type: String },
  score:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Coder', coderSchema);
