const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const assemblyRoutes = require('./routes/assemblyRoutes');
const registerRoutes = require('./routes/registerRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/assemblies', assemblyRoutes);
app.use('/api/register', registerRoutes);


sequelize.sync({ force: true }).then(async () => {
  const { seedDatabase } = require('./utils/db');
  await seedDatabase();
  app.listen(3000, () => console.log('Backend running on port 3000'));
});
