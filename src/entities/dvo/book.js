const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string(),
    date: Joi.string(),
    author: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
});
