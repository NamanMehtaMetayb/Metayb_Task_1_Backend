const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/biketracker');

const Employee = require('./Employee')(sequelize, DataTypes);
const Bike = require('./Bike')(sequelize, DataTypes);
const Assembly = require('./Assembly')(sequelize, DataTypes);

Assembly.belongsTo(Employee, { foreignKey: 'EMPLOYEEID' });
Assembly.belongsTo(Bike, { foreignKey: 'BIKEID' });

module.exports = {
  sequelize,
  Employee,
  Bike,
  Assembly
};
