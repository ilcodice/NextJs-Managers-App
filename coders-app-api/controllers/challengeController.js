const Challenge = require('../models/Clallenge');

// Create a new challenge and save to DB
exports.createChallenge = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      level,
      code,
      tests
    } = req.body;

    const managerId = req.user?.id || req.body.manager || null; // Use from auth if available

    if (!managerId) {
      return res.status(400).json({ error: 'Manager ID is required' });
    }

    const challenge = new Challenge({
      title,
      category,
      description,
      difficulty: level,
      manager: managerId,
      code,
      tests
    });

    await challenge.save();

    res.status(201).json({ message: 'Challenge created successfully', challenge });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// controllers/challengesController.js

exports.updateChallenge = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  console.log("Updating challenge with ID:", id);
  console.log("Received data:", data);

  // Simulate DB update
  const updatedChallenge = {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // Send back the simulated "updated" challenge
  res.status(200).json({
    message: `Challenge ${id} updated successfully!`,
    challenge: updatedChallenge,
  });
};




// Get all challenges, optionally filter by category
exports.getAllChallenges = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const challenges = await Challenge.find(filter);

    res.status(200).json({ challenges });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    res.status(200).json({ challenge });
  } catch (error) {
    console.error('Error fetching challenge by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all unique categories from existing challenges
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Challenge.distinct('category');
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
