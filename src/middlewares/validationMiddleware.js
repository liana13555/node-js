const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

module.exports = {
  addPostValidation: (req, res, next) => {
    // next(new Error('validation failed!!!'))
    const schema = Joi.object({
      topic: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      text: Joi.string()
        .alphanum()
        .min(10)
        .max(400)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details));
      // return res.status(400).json({status: validationResult.error.details});
    };

    next();
  },
};
