const express = require('express');
const { createAssembly, getAssemblies } = require('../controllers/assemblyController');

const router = express.Router();
router.post('/', createAssembly);
router.get('/', getAssemblies);

module.exports = router;
