const Joi = require('joi');

exports.validateTopK = (req, res, next) => {
  const schema = Joi.object({
    k: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.query);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};
