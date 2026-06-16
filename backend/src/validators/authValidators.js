const { body } = require('express-validator');

const register = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
  body('nombre').trim().notEmpty().withMessage('Nombre obligatorio'),
];
const login = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('Contraseña obligatoria'),
];
const refresh = [body('refreshToken').notEmpty().withMessage('refreshToken obligatorio')];
const logout = [body('refreshToken').notEmpty().withMessage('refreshToken obligatorio')];
const updateMe = [
  body('nombre').optional().trim().notEmpty().withMessage('Nombre no puede estar vacío'),
  body('password').optional().isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
  body('passwordActual').if(body('password').exists()).notEmpty().withMessage('passwordActual obligatorio'),
];

const forgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
];

const resetPassword = [
  body('token')
    .notEmpty()
    .withMessage('Token obligatorio'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Mínimo 6 caracteres')
];

module.exports = {register,login,refresh,logout,updateMe,forgotPassword,resetPassword};