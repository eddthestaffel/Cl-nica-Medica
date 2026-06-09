'use strict';

module.exports = (sequelize, DataTypes) => {
  const TurnoMedico = sequelize.define('TurnoMedico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pacienteId: { type: DataTypes.INTEGER, allowNull: false },
    medico: { type: DataTypes.STRING(120), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFin: { type: DataTypes.TIME, allowNull: false },
    estado: {
      type: DataTypes.ENUM('programado', 'atendido', 'cancelado'),
      allowNull: false,
      defaultValue: 'programado',
    },
    motivo: { type: DataTypes.STRING(255), allowNull: true },
  }, { tableName: 'turnos_medicos' });

  TurnoMedico.associate = models => {
    TurnoMedico.belongsTo(models.Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
  };

  return TurnoMedico;
};