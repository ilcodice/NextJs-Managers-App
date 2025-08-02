const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};
