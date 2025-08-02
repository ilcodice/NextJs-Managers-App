const Joi = require('joi');

const submissionSchema = Joi.object({
  lang: Joi.string().valid('py', 'js').required(),
  code: Joi.string().required(),
  challenge_id: Joi.string().required()
});

exports.validateSubmission = (req, res, next) => {
  const { error } = submissionSchema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};
