const express = require('express');
const router = express.Router();
const userController = require('./controller/authController');

router.use('/auth', userController);

module.exports = router;