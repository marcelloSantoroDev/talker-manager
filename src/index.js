const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const tokenGenerator = require('./tokenGenerator');
const readFile = require('./readFile');
const {
  loginValidations,
  tokenValidations,
  nameValidations,
  ageValidations,
  talkValidations,
  rateValidations,
  watchedAtValidations,
} = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});

const talkerPath = path.resolve(__dirname, 'talker.json');

app.get('/talker/search', tokenValidations, async (req, res) => {
  const { q } = req.query;
  const talkerList = await readFile();
  if (!q) {
    return res.status(200).send(talkerList);
  }
  const search = talkerList.filter((talker) => talker.name.includes(q));
  return res.status(200).send(search);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = Number(req.params.id);
  const talkerList = await readFile();
  const searchedTalker = talkerList.find((talker) => talker.id === talkerId);
  if (!searchedTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).send(searchedTalker);
});

app.get('/talker', async (req, res) => {
  const talkerList = await readFile();
  if (!talkerList) {
    return res.status(200).send([]);
  }
    return res.status(200).send(talkerList);
});

app.post('/login', loginValidations, async (req, res) => {
  const token = tokenGenerator();
  return res.status(200).send({ token });
});

app.post('/talker',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
async (req, res) => {
  const talkerList = await readFile();
  const newTalker = req.body;
  newTalker.id = talkerList[talkerList.length - 1].id + 1;
  talkerList.push(newTalker);
  await fs.writeFile(talkerPath, JSON.stringify(talkerList));
  res.status(201).send(newTalker);
});

app.put('/talker/:id',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
async (req, res) => {
  const talkerList = await readFile();
  const talkerToEdit = req.body;
  const talkerId = Number(req.params.id);
  const index = talkerList.findIndex((talker) => talker.id === talkerId);
  talkerList.splice(index, 1, talkerToEdit);
  talkerList[index].id = talkerId;
  await fs.writeFile(talkerPath, JSON.stringify(talkerList));
  res.status(200).send(talkerToEdit);
});

app.delete('/talker/:id', tokenValidations, async (req, res) => {
const talkerId = Number(req.params.id);
const talkerList = await readFile();
const filteredList = talkerList.filter((talker) => talker.id !== talkerId);
await fs.writeFile(talkerPath, JSON.stringify(filteredList));
res.sendStatus(204);
});