const { body, param, query } = require('express-validator');

const idParam = [param('id').isInt().withMessage('ID inválido')];
const create = [
  body('pacienteId').isInt().withMessage('pacienteId inválido'),
  body('medico').trim().notEmpty().withMessage('Médico requerido'),
  body('fecha').isDate().withMessage('Fecha inválida'),
  body('horaInicio').matches(/^\d{2}:\d{2}$/).withMessage('horaInicio inválida (HH:MM)'),
  body('horaFin').matches(/^\d{2}:\d{2}$/).withMessage('horaFin inválida (HH:MM)'),
  body('motivo').optional().trim(),
];
const cambiarEstado = [
  body('estado').isIn(['programado', 'atendido', 'cancelado']).withMessage('Estado inválido'),
];
const agendaQuery = [query('fecha').optional().isDate().withMessage('Fecha inválida')];

module.exports = { idParam, create, cambiarEstado, agendaQuery };