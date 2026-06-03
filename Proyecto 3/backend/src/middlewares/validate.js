const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError('Error de validación', 400, errors.array());
  next();
};