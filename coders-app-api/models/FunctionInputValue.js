
const mongoose = require('mongoose');

const functionInputValueSchema = new mongoose.Schema({
  test_case: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase', required: true },
  name:      { type: String, required: true },
  value:     { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('FunctionInputValue', functionInputValueSchema);
