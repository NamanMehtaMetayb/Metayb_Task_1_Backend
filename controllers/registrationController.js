// Registration controller
const { Employee } = require('../models');

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existing = await Employee.findOne({ where: { USERNAME: username } });
    if (existing) return res.status(400).json({ message: 'Username already taken' });

    // No need to manually hash here — handled by model hook
    const newUser = await Employee.create({
      NAME: name,
      USERNAME: username,
      PASSWORD: password, // raw password — will be hashed in model
      ISADMIN: false,
    });

    res.status(201).json({
      userId: newUser.ID,
      name: newUser.NAME,
      isAdmin: newUser.ISADMIN,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = { register };
