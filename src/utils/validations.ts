import validator from 'cpf-cnpj-validator';
import Joi from 'joi';

const numberPatternRegex = /^\(?\d{2,}\)?[ -]?\d{4,}[-\s]?\d{4}$/;

const joi = Joi.extend(validator);

const ERROR = {
  REQUIRED: 'Este campo é obrigatório.',
  URL: 'Deve conter uma URL válida.',
  EMAIL: 'Este campo deve ser um email válido.',
  FORM: 'Ocorreu um erro ao salvar. Por favor, tente mais tarde.',
  PHONE: 'Este campo deve ser um telefone válido.',
  MIN: 'Deve ser maior que 9 caracteres.',
  MAX: 'Deve ser menor que 12 caracteres.',
  OTP: 'Por favor informe a senha completa.',
  CPF: 'Deve conter um cpf válido',
  CNPJ: 'Deve conter um cnpj válido',
};

const VALIDATION = {
  BOOLEAN: joi.boolean().invalid(false).required().messages({
    'boolean.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
    'any.invalid': ERROR.REQUIRED,
  }),
  BOOLEAN_ACCEPT_FALSE: joi.boolean().required().messages({
    'boolean.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
  }),
  TEXT: joi.string().required().messages({
    'string.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
  }),
  CPF: joi.document().cpf().required().messages({
    'string.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
    'document.cpf': ERROR.CPF,
  }),
  CNPJ: joi.document().cnpj().required().messages({
    'string.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
    'document.cnpj': ERROR.CNPJ,
  }),
  EMAIL: joi
    .string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': ERROR.REQUIRED,
      'string.email': ERROR.EMAIL,
    }),
  URL: joi.string().required().domain().messages({
    'string.empty': ERROR.REQUIRED,
    'string.domain': ERROR.URL,
  }),
  PHONE: joi.string().required().min(11).max(15).pattern(numberPatternRegex).messages({
    'string.empty': ERROR.REQUIRED,
    'string.min': ERROR.MIN,
    'string.max': ERROR.MAX,
    'string.pattern.base': ERROR.PHONE,
  }),
  OTP: joi.string().min(6).required().messages({
    'string.empty': ERROR.REQUIRED,
    'any.required': ERROR.REQUIRED,
    'string.min': ERROR.OTP,
  }),
};

export { VALIDATION, ERROR };
