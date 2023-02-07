const path = require('path');

const fs = require('fs/promises');

const readFile = require('../../readFile');

const talkerPath = path.resolve(__dirname, '../../talker.json');

const searchController = async (req, res) => {
  const { q } = req.query;
  const talkerList = await readFile();
  if (!q) {
    return res.status(200).send(talkerList);
  }
  const search = talkerList.filter((talker) => talker.name.includes(q));
  return res.status(200).send(search);
};

const getIdController = async (req, res) => {
  const talkerId = Number(req.params.id);
  const talkerList = await readFile();
  const searchedTalker = talkerList.find((talker) => talker.id === talkerId);
  if (!searchedTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).send(searchedTalker);
};

const getRootController = async (req, res) => {
  const talkerList = await readFile();
  if (!talkerList) {
    return res.status(200).send([]);
  }
    return res.status(200).send(talkerList);
};

const postRootController = async (req, res) => {
  const talkerList = await readFile();
  const newTalker = req.body;
  newTalker.id = talkerList[talkerList.length - 1].id + 1;
  talkerList.push(newTalker);
  await fs.writeFile(talkerPath, JSON.stringify(talkerList));
  res.status(201).send(newTalker);
};

const putIdController = async (req, res) => {
  const talkerList = await readFile();
  const talkerToEdit = req.body;
  const talkerId = Number(req.params.id);
  const index = talkerList.findIndex((talker) => talker.id === talkerId);
  talkerList.splice(index, 1, talkerToEdit);
  talkerList[index].id = talkerId;
  await fs.writeFile(talkerPath, JSON.stringify(talkerList));
  res.status(200).send(talkerToEdit);
};

const deleteIdController = async (req, res) => {
  const talkerId = Number(req.params.id);
  const talkerList = await readFile();
  const filteredList = talkerList.filter((talker) => talker.id !== talkerId);
  await fs.writeFile(talkerPath, JSON.stringify(filteredList));
  res.sendStatus(204);
};

module.exports = {
    searchController,
    getIdController,
    getRootController,
    postRootController,
    putIdController,
    deleteIdController,
};