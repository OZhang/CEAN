const Joi = require('joi');

module.exports = Joi.object.keys({
    isbn: Joi.string(),
    title: Joi.string(),
    author: Joi.string(),
    description: Joi.string(),
    published_year: Joi.string(),
    publisher: Joi.string(),
    updated_date: Joi.date().default(Date.now),
});