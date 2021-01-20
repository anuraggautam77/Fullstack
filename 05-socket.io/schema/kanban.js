const Joi = require('joi');

module.exports = {


  boardschema: Joi.object().keys({
    Title: Joi.string().min(2).max(50),
    Description: Joi.string().min(2).max(100),
  }),

  listschema: Joi.object().keys({
    listlabel: Joi.string().min(2).max(50),
    bgcolor: Joi.string().min(2).max(100),
  }),
  cardschema: Joi.object().keys({
    title: Joi.string().min(2).max(50),
  }),

};
