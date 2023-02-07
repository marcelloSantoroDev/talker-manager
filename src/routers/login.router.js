const express = require('express');

const router = express.Router();

const { loginValidations } = require('../utils/middlewares');

const authController = require('./controllers/loginController');

router.post('/', loginValidations, authController);

module.exports = router;