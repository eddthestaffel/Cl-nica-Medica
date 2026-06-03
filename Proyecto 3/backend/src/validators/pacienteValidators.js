const { body, param } = require('express-validator');

const idParam = [param('id').isInt().withMessage('ID inválido')];
const create = [
  body('nombre').trim().notEmpty().withMessage('Nombre requerido'),
  body('apellido').trim().notEmpty().withMessage('Apellido requerido'),
  body('rut').trim().notEmpty().withMessage('RUT requerido'),
  body('fechaNacimiento').isDate().withMessage('Fecha de nacimiento inválida'),
  body('telefono').optional().trim(),
  body('email').optional().isEmail().withMessage('Email inválido'),
];

module.exports = { idParam, create };