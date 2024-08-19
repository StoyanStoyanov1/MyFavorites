const express = require('express');
const router = express.Router();
const authController = require('./controller/authController');
const contentController = require('./controller/contentController')

router.use('/auth', authController);
router.use('/content', contentController)

module.exports = router;