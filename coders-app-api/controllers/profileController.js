exports.getCoderProfile = (req, res) => {
    res.json({ message: 'Coder profile fetched', id: req.params.id });
  };
  
  exports.getManagerProfile = (req, res) => {
    res.json({ message: 'Manager profile fetched', id: req.params.id });
  };
  
  exports.updateCoderProfile = (req, res) => {
    res.json({ message: 'Coder profile updated', data: req.body });
  };
  
  exports.updateManagerProfile = (req, res) => {
    res.json({ message: 'Manager profile updated', data: req.body });
  };
  