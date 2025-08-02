const mongoose = require('mongoose');

const functionInputDefinitionSchema = new mongoose.Schema({
  code: { type: mongoose.Schema.Types.ObjectId, ref: 'Code', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('FunctionInputDefinition', functionInputDefinitionSchema);
