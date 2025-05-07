module.exports = (sequelize, DataTypes) => {
  const Bike = sequelize.define('Bike', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NAME: { type: DataTypes.STRING, allowNull: false },
    DURATION: { type: DataTypes.INTEGER, allowNull: false } // Duration in minutes
  }, {
    tableName: 'Bikes',
    timestamps: false
  });

  Bike.associate = (models) => {
    Bike.hasMany(models.Assembly, { foreignKey: 'BIKEID' });
  };

  return Bike;
};
