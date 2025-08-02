exports.getLeaderboard = (req, res) => {
    res.json({ message: 'Full leaderboard data', coders: [] });
  };
  
  exports.getTopKCoders = (req, res) => {
    const k = req.query.k;
    res.json({ message: `Top ${k} coders`, coders: [] });
  };
  