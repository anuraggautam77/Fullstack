const Joi = require('joi');

module.exports = {
  boardschema: Joi.object().keys({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(100),
  }),
  listschema: Joi.object().keys({
    listlabel: Joi.string().min(2).max(50),
    bgcolor: Joi.string().min(2).max(100),
  }),
  cardschema: Joi.object().keys({
    title: Joi.string().min(2).max(50),
  }),

  validateboardschema: (req, res, done) => {
    const result = this.listschema.validate(req.body);
    if (result.error) {
      res.status(500).send({
        messgae: result.error,
      });
    }
    done();
  },
  validatelistschema: (req, res, done) => {
    const result = this.listschema.validate(req.body);
    if (result.error) {
      res.status(500).send({
        messgae: result.error,
      });
    }
    done();
  },

  validatecardschema: (req, res, done) => {
    const result = this.cardschema.validate(req.body);
    if (result.error) {
      res.status(500).send({
        messgae: result.error,
      });
    }
    done();
  },


};
