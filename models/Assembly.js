module.exports = (sequelize, DataTypes) => {
  const Assembly = sequelize.define('Assembly', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    EMPLOYEEID: { type: DataTypes.INTEGER, allowNull: false },
    BIKEID: { type: DataTypes.INTEGER, allowNull: false },
    STARTTIME: { type: DataTypes.DATE, allowNull: false },
    ENDTIME: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'Assemblies',
    timestamps: false
  });

  Assembly.associate = (models) => {
    Assembly.belongsTo(models.Employee, { foreignKey: 'EMPLOYEEID' });
    Assembly.belongsTo(models.Bike, { foreignKey: 'BIKEID' });
  };

  return Assembly;
};
