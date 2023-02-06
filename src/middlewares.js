const loginValidations = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  const checkPassword = password.length >= 6;
  const checkEmail = regex.test(email);
  if (!checkEmail) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!checkPassword) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
    next();
};

const tokenValidations = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  const validateAuth = authorization.length === 16 && typeof authorization === 'string';
  if (!validateAuth) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const nameValidations = (req, res, next) => {
  const { name } = req.body;
   if (!name) {
     return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidations = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({
      message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(400).send({
      message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400).send({
      message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age < 18) {
    return res.status(400).send({
      message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidations = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const rateValidations = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!Number.isInteger(talk.rate)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const watchedAtValidations = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
  const checkDate = dateRegex.test(talk.watchedAt);
  if (!talk.watchedAt) {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!checkDate) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
loginValidations,
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
rateValidations,
watchedAtValidations,
};