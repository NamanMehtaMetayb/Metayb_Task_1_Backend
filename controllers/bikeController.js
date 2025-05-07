const { Bike } = require('../models');

const getAllBikes = async (req, res) => {
  const bikes = await Bike.findAll();
  res.json(bikes);
};

module.exports = { getAllBikes };
