// services/challengeService.js
const Challenge = require('../models/Challenge');

exports.createChallenge = async ({ title, category, description, difficulty, code, tests, manager }) => {
  const challenge = new Challenge({
    title,
    category,
    description,
    difficulty,
    code,
    tests,
    manager
  });

  return await challenge.save();
};
