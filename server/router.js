const express = require('express');
const router = express.Router();
const authController = require('./controller/authController');
const contentController = require('./controller/contentController');
const userService = require('./controller/userController');
const voteController = require("./controller/voteController");

router.use('/auth', authController);
router.use('/content', contentController);
router.use('/user', userService);
router.use('/vote', voteController)

module.exports = router;