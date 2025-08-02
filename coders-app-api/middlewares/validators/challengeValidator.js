const Joi = require('joi');

const challengeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  code: Joi.object({
    function_name: Joi.string().required(),
    code_text: Joi.array().items(
      Joi.object({
        language: Joi.string().valid('py', 'js').required(),
        text: Joi.string().required(),
      })
    ).required(),
    inputs: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
      })
    ).required()
  }).required(),
  tests: Joi.array().items(
    Joi.object({
      weight: Joi.number().min(0).max(1).required(),
      inputs: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.any().required()
        })
      ).required(),
      output: Joi.any().required()
    })
  ).required()
});

exports.validateChallenge = (req, res, next) => {
  const { error } = challengeSchema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};
