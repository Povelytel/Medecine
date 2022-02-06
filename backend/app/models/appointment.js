module.exports = function (sequelize, Sequelize) {
  const Appointment = sequelize.define('appointment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
      notEmpty: true,
    },
    date: { type: Sequelize.DATE, notEmpty: true },
    problems: { type: Sequelize.TEXT, defaultValue: '' },
    life_history: { type: Sequelize.TEXT, defaultValue: '' },
    disease_history: { type: Sequelize.TEXT, defaultValue: '' },
    think_begin: { type: Sequelize.TEXT, defaultValue: '' },
    disease_begin: { type: Sequelize.TEXT, defaultValue: '' },
    treatment: { type: Sequelize.TEXT, defaultValue: '' },
    objective_examination: { type: Sequelize.TEXT, defaultValue: '' },
    walk: { type: Sequelize.TEXT, defaultValue: '' },
    palpatation: { type: Sequelize.TEXT, defaultValue: '' },
    segment_perimeter: { type: Sequelize.TEXT, defaultValue: '' },
    segment_walk: { type: Sequelize.TEXT, defaultValue: '' },
    preliminary_diagnosis: { type: Sequelize.TEXT, defaultValue: '' },
    clinical_diagnosis: { type: Sequelize.TEXT, defaultValue: '' },
    appointment: { type: Sequelize.TEXT, defaultValue: '' },
    survey_plan: { type: Sequelize.TEXT, defaultValue: '' },
    re_consultation: { type: Sequelize.TEXT, defaultValue: '' },
    needs: { type: Sequelize.TEXT, defaultValue: '' },
    xray_date: { type: Sequelize.DATE, allowNull: true },
    xray_about: { type: Sequelize.TEXT, defaultValue: '' },
  });

  return Appointment;
};
