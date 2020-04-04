import Joi from '@hapi/joi';

const validators = {
  authForm: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  })
};

export { validators };
