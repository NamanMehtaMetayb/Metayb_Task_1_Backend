const { Assembly, Employee, Bike } = require('../models');
const { Op } = require('sequelize');

const createAssembly = async (req, res) => {
  const { employeeId, bikeId, startTime, endTime } = req.body;

  const ongoingByEmployee = await Assembly.findOne({
    where: { EMPLOYEEID: employeeId, ENDTIME: { [Op.gt]: new Date() } }
  });

  if (ongoingByEmployee)
    return res.status(400).json({ message: 'Employee is already assembling a bike.' });

  const bikeInUse = await Assembly.findOne({
    where: { BIKEID: bikeId, ENDTIME: { [Op.gt]: new Date() } }
  });

  if (bikeInUse)
    return res.status(400).json({ message: 'Bike is currently being assembled by another employee.' });

  const record = await Assembly.create({ EMPLOYEEID: employeeId, BIKEID: bikeId, STARTTIME: startTime, ENDTIME: endTime });
  res.json(record);
};

const getAssemblies = async (req, res) => {
  const { from, to } = req.query;
  const where = {};

  if (from && to) {
    where.STARTTIME = { [Op.between]: [new Date(from), new Date(to)] };
  }

  const records = await Assembly.findAll({
    where,
    include: [
      { model: Employee, attributes: ['NAME'] },
      { model: Bike, attributes: ['NAME'] }
    ]
  });

  res.json(records);
};

module.exports = { createAssembly, getAssemblies };
