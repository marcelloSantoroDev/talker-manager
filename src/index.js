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

const validations = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if(!email) {
    return res.status(400).send({ "message": "O campo \"email\" é obrigatório" })
  } else if (!password) {
    return res.status(400).send({ "message": "O campo \"password\" é obrigatório" })
  }
  const checkPassword = password.length >= 6;
  const checkEmail = regex.test(email);
  if(!checkEmail) {
    return res.status(400).send({ "message": "O \"email\" deve ter o formato \"email@email.com\"" })
  } else if (!checkPassword) {
    return res.status(400).send({ "message": "O \"password\" deve ter pelo menos 6 caracteres" })
  } else {
    next()
  }
}

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

app.post('/login', validations, async(req, res) => {
    const token = tokenGenerator();
    return res.status(200).send({ "token": token });
})