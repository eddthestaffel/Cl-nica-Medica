const { Op } = require('sequelize');
const db = require('../models');
const { AppError } = require('../utils/errors');
const asyncHandler = require('../utils/asyncHandler');

const pacienteInclude = { model: db.Paciente, as: 'paciente', attributes: ['id', 'nombre', 'apellido', 'rut'] };

const verificarSolapamiento = async (medico, fecha, horaInicio, horaFin, excludeId = null) => {
  const where = {
    medico, fecha,
    estado: { [Op.ne]: 'cancelado' },
    [Op.or]: [
      { horaInicio: { [Op.between]: [horaInicio, horaFin] } },
      { horaFin: { [Op.between]: [horaInicio, horaFin] } },
      { horaInicio: { [Op.lte]: horaInicio }, horaFin: { [Op.gte]: horaFin } },
    ],
  };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const conflicto = await db.TurnoMedico.findOne({ where });
  if (conflicto) throw new AppError('El médico ya tiene un turno en ese horario', 409);
};

const list = asyncHandler(async (req, res) => {
  const where = {};
  if (req.query.medico) where.medico = { [Op.like]: `%${req.query.medico}%` };
  if (req.query.fecha) where.fecha = req.query.fecha;
  if (req.query.estado) where.estado = req.query.estado;
  const turnos = await db.TurnoMedico.findAll({ where, include: [pacienteInclude], order: [['fecha', 'ASC'], ['horaInicio', 'ASC']] });
  res.json({ success: true, data: turnos });
});

const getById = asyncHandler(async (req, res) => {
  const turno = await db.TurnoMedico.findByPk(req.params.id, { include: [pacienteInclude] });
  if (!turno) throw new AppError('Turno no encontrado', 404);
  res.json({ success: true, data: turno });
});

const create = asyncHandler(async (req, res) => {
  const paciente = await db.Paciente.findByPk(req.body.pacienteId);
  if (!paciente) throw new AppError('Paciente no encontrado', 404);
  await verificarSolapamiento(req.body.medico, req.body.fecha, req.body.horaInicio, req.body.horaFin);
  const turno = await db.TurnoMedico.create(req.body);
  const con = await db.TurnoMedico.findByPk(turno.id, { include: [pacienteInclude] });
  res.status(201).json({ success: true, data: con });
});

const update = asyncHandler(async (req, res) => {
  const turno = await db.TurnoMedico.findByPk(req.params.id);
  if (!turno) throw new AppError('Turno no encontrado', 404);
  const medico = req.body.medico || turno.medico;
  const fecha = req.body.fecha || turno.fecha;
  const horaInicio = req.body.horaInicio || turno.horaInicio;
  const horaFin = req.body.horaFin || turno.horaFin;
  await verificarSolapamiento(medico, fecha, horaInicio, horaFin, turno.id);
  await turno.update(req.body);
  const con = await db.TurnoMedico.findByPk(turno.id, { include: [pacienteInclude] });
  res.json({ success: true, data: con });
});

const cambiarEstado = asyncHandler(async (req, res) => {
  const turno = await db.TurnoMedico.findByPk(req.params.id);
  if (!turno) throw new AppError('Turno no encontrado', 404);
  await turno.update({ estado: req.body.estado });
  res.json({ success: true, data: turno });
});

const remove = asyncHandler(async (req, res) => {
  const turno = await db.TurnoMedico.findByPk(req.params.id);
  if (!turno) throw new AppError('Turno no encontrado', 404);
  await turno.destroy();
  res.status(204).send();
});

const agenda = asyncHandler(async (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().split('T')[0];
  const where = { fecha };
  if (req.query.medico) where.medico = { [Op.like]: `%${req.query.medico}%` };
  const turnos = await db.TurnoMedico.findAll({ where, include: [pacienteInclude], order: [['horaInicio', 'ASC']] });
  res.json({ success: true, fecha, data: turnos });
});

module.exports = { list, getById, create, update, cambiarEstado, remove, agenda };