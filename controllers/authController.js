const bcrypt = require('bcrypt');
const { Employee } = require('../models');

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Employee.findOne({ where: { USERNAME: username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ message: 'Server error during password check' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Success
      res.json({ userId: user.ID, name: user.NAME, isAdmin: user.ISADMIN });
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { login };
