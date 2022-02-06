module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: { type: Sequelize.STRING, notEmpty: true },
    last_name: { type: Sequelize.STRING, notEmpty: true },
    patronymic: { type: Sequelize.STRING },
    // about: { type: Sequelize.TEXT },
    // email: { type: Sequelize.STRING, validate: { isEmail: true } },
    // password: { type: Sequelize.STRING, allowNull: false },
    // last_login: { type: Sequelize.DATEONLY },
    // status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' },
    // privilege: { type: Sequelize.INTEGER, defaultValue: '2' },
    tel: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    job: { type: Sequelize.STRING, allowNull: true },
    birthday: { type: Sequelize.DATE, notEmpty: true },
    gender: { type: Sequelize.INTEGER, notEmpty: true },
    // region: { type: Sequelize.STRING },
    // district: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    street: { type: Sequelize.STRING },
  });

  return User;
};
