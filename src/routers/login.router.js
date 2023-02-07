const express = require('express');

const router = express.Router();

const { loginValidations } = require('../middlewares');

const tokenGenerator = require('../tokenGenerator');

router.post('/', loginValidations, async (req, res) => {
  const token = tokenGenerator();
  return res.status(200).send({ token });
});

module.exports = router;