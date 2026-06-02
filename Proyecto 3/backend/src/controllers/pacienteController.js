const { Op } = require('sequelize');
const db = require('../models');
const { AppError } = require('../utils/errors');
const asyncHandler = require('../utils/asyncHandler');

const list = asyncHandler(async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      { nombre: { [Op.like]: `%${req.query.search}%` } },
      { apellido: { [Op.like]: `%${req.query.search}%` } },
      { rut: { [Op.like]: `%${req.query.search}%` } },
    ];
  }
  const pacientes = await db.Paciente.findAll({ where, order: [['apellido', 'ASC']] });
  res.json({ success: true, data: pacientes });
});

const getById = asyncHandler(async (req, res) => {
  const paciente = await db.Paciente.findByPk(req.params.id, {
    include: [{ model: db.TurnoMedico, as: 'turnos', order: [['fecha', 'DESC']] }],
  });
  if (!paciente) throw new AppError('Paciente no encontrado', 404);
  res.json({ success: true, data: paciente });
});

const create = asyncHandler(async (req, res) => {
  const paciente = await db.Paciente.create(req.body);
  res.status(201).json({ success: true, data: paciente });
});

const update = asyncHandler(async (req, res) => {
  const paciente = await db.Paciente.findByPk(req.params.id);
  if (!paciente) throw new AppError('Paciente no encontrado', 404);
  await paciente.update(req.body);
  res.json({ success: true, data: paciente });
});

const remove = asyncHandler(async (req, res) => {
  const paciente = await db.Paciente.findByPk(req.params.id);
  if (!paciente) throw new AppError('Paciente no encontrado', 404);
  await paciente.destroy();
  res.status(204).send();
});

module.exports = { list, getById, create, update, remove };