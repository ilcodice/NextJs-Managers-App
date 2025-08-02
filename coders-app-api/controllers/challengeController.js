exports.createChallenge = (req, res) => {
    res.json({ message: 'Challenge created', challenge: req.body });
  };
  
  exports.getAllChallenges = (req, res) => {
    const { category } = req.query;
    res.json({ message: 'All challenges fetched', filter: category || 'none' });
  };
  
  exports.getChallengeById = (req, res) => {
    res.json({ message: 'Challenge by ID', id: req.params.id });
  };
  
  exports.getAllCategories = (req, res) => {
    res.json({
      message: 'Categories fetched',
      categories: ['Math', 'Strings', 'Algorithms', 'Data Structures']
    });
  };
  

exports.getAllChallenges = (req, res) => {

  const challenges = [
    { id: 1, title: "FizzBuzz", difficulty: "easy" },
    { id: 2, title: "Two Sum", difficulty: "medium" },
    { id: 3, title: "LRU Cache", difficulty: "hard" }
  ];
  res.json({ challenges });
};
