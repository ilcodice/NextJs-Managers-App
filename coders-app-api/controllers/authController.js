exports.registerCoder = (req, res) => {
    res.json({ message: 'Coder registered successfully', data: req.body });
  };
  
  exports.registerManager = (req, res) => {
    res.json({ message: 'Manager registered successfully', data: req.body });
  };
  
  exports.loginCoder = (req, res) => {
    res.json({ message: 'Coder logged in', data: req.body });
  };
  
  exports.loginManager = (req, res) => {
    res.json({ message: 'Manager logged in', data: req.body });
  };
  