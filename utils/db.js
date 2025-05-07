const bcrypt = require('bcrypt');
const { Employee, Bike } = require('../models');

const seedDatabase = async () => {
  await Employee.bulkCreate([
    {
      NAME: 'Alice',
      USERNAME: 'alice',
      PASSWORD: await bcrypt.hash('pass1', 10)
    },
    {
      NAME: 'Bob',
      USERNAME: 'bob',
      PASSWORD: await bcrypt.hash('pass2', 10)
    },
    {
      NAME: 'Eve',
      USERNAME: 'eve',
      PASSWORD: await bcrypt.hash('adminpass', 10),
      ISADMIN: true
    }
  ]);

  await Bike.bulkCreate([
    { NAME: 'Bike 1', DURATION: 50 },
    { NAME: 'Bike 2', DURATION: 60 },
    { NAME: 'Bike 3', DURATION: 80 }
  ]);
};

module.exports = { seedDatabase };
