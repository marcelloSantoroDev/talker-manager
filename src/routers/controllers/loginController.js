const tokenGenerator = require('../../tokenGenerator');

const authController = async (req, res) => {
  const token = tokenGenerator();
  return res.status(200).send({ token });
};

module.exports = authController;
