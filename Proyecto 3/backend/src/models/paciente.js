'use strict';

module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    apellido: { type: DataTypes.STRING(120), allowNull: false },
    rut: { type: DataTypes.STRING(12), allowNull: false, unique: true },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: true },
  }, { tableName: 'pacientes' });

  Paciente.associate = models => {
    Paciente.hasMany(models.TurnoMedico, { foreignKey: 'pacienteId', as: 'turnos' });
  };

  return Paciente;
};