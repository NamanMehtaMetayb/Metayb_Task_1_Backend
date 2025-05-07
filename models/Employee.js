const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NAME: { type: DataTypes.STRING, allowNull: false },
    USERNAME: { type: DataTypes.STRING, allowNull: false, unique: true },
    PASSWORD: { type: DataTypes.STRING(100), allowNull: false },
    ISADMIN: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Employees',
    timestamps: false
  });

  // Hash password before save
  Employee.beforeCreate(async (employee) => {
    if (employee.PASSWORD) {
      const salt = await bcrypt.genSalt(10);
      employee.PASSWORD = await bcrypt.hash(employee.PASSWORD, salt);
    }
  });

  Employee.beforeUpdate(async (employee) => {
    if (employee.changed('PASSWORD')) {
      const salt = await bcrypt.genSalt(10);
      employee.PASSWORD = await bcrypt.hash(employee.PASSWORD, salt);
    }
  });

  return Employee;
};
