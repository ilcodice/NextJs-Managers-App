exports.getSolvedStats = (req, res) => {
    res.json({ message: 'Solved challenges stats', coderId: req.query.coder_id });
  };
  
  exports.getTrendingCategories = (req, res) => {
    res.json({ message: 'Trending categories', data: ['Math', 'Algorithms'] });
  };
  
  exports.getHeatmap = (req, res) => {
    const { start_date, end_date } = req.query;
    res.json({
      message: 'Heatmap data',
      start_date,
      end_date,
      activity: []
    });
  };
  