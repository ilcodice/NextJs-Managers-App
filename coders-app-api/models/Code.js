// models/Code.js
const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  challenge:     { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  language:      { type: String, required: true },
  function_name: { type: String, required: true },
  code_content:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Code', codeSchema);
