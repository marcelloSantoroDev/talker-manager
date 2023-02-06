const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

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

const talkerPath = path.resolve(__dirname, 'talker.json')

const readFile = async () => {
try {
  const data = await fs.readFile(talkerPath);
  return JSON.parse(data)
} catch (error) {
  console.log(error);
}
}

const tokenGenerator = () => {
  return crypto.randomBytes(8).toString('hex');
};

app.get('/talker/:id', async (req, res) => {
  const talkerId = Number(req.params.id);
  const talkerList = await readFile();
  const searchedTalker = talkerList.find((talker) => talker.id === talkerId);
  if(!searchedTalker) {
    return res.status(404).send({ "message": "Pessoa palestrante não encontrada" });
  } else {
    return res.status(200).send(searchedTalker);
  }
});

app.get('/talker', async (req, res) => {
  const talkerList = await readFile();
  if(!talkerList) {
    return res.status(200).send([]);
  } else {
    return res.status(200).send(talkerList)
  }
});

app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  const validate = email && password;
  if(validate){
    const token = tokenGenerator();
    return res.status(200).send({ "token": token });
  }
})