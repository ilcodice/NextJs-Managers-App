const mongoose = require('mongoose');
const Joi = require('joi'); 


const inputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
}, { _id: false });

const codeTextSchema = new mongoose.Schema({
  language: { type: String, required: true },
  text:     { type: String, required: true }
}, { _id: false });

const codeSchema = new mongoose.Schema({
  function_name: { type: String, required: true },
  code_text:     [codeTextSchema],
  inputs:        [inputSchema]
}, { _id: false });

const testInputSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const testSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  inputs: [testInputSchema],
  output: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const challengeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  difficulty: Joi.string().valid('Easy', 'Moderate', 'Hard').required(),
  manager:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code:        { type: codeSchema, required: true },
  tests:       [testSchema]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
