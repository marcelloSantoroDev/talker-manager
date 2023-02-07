const express = require('express');

const router = express.Router();

const path = require('path');

const fs = require('fs/promises');

const readFile = require('../readFile');

const {
    searchController,
    getIdController,
    getRootController,
    postRootController,
    putIdController,
    deleteIdController,
} = require('./controllers/talkerController');

const {
  tokenValidations,
  nameValidations,
  ageValidations,
  talkValidations,
  rateValidations,
  watchedAtValidations,
} = require('../middlewares');

const talkerPath = path.resolve(__dirname, '../talker.json');

// router.get('/search', tokenValidations, async (req, res) => {
//   const { q } = req.query;
//   const talkerList = await readFile();
//   if (!q) {
//     return res.status(200).send(talkerList);
//   }
//   const search = talkerList.filter((talker) => talker.name.includes(q));
//   return res.status(200).send(search);
// });

router.get('/search', tokenValidations, searchController);

// router.get('/:id', async (req, res) => {
//   const talkerId = Number(req.params.id);
//   const talkerList = await readFile();
//   const searchedTalker = talkerList.find((talker) => talker.id === talkerId);
//   if (!searchedTalker) {
//     return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
//   }
//     return res.status(200).send(searchedTalker);
// });

router.get('/:id', getIdController);

// router.get('/', async (req, res) => {
//   const talkerList = await readFile();
//   if (!talkerList) {
//     return res.status(200).send([]);
//   }
//     return res.status(200).send(talkerList);
// });

router.get('/', getRootController);

// router.post('/',
// tokenValidations,
// nameValidations,
// ageValidations,
// talkValidations,
// watchedAtValidations,
// rateValidations,
// async (req, res) => {
//   const talkerList = await readFile();
//   const newTalker = req.body;
//   newTalker.id = talkerList[talkerList.length - 1].id + 1;
//   talkerList.push(newTalker);
//   await fs.writeFile(talkerPath, JSON.stringify(talkerList));
//   res.status(201).send(newTalker);
// });

router.post('/',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
postRootController);

// router.put('/:id',
// tokenValidations,
// nameValidations,
// ageValidations,
// talkValidations,
// watchedAtValidations,
// rateValidations,
// async (req, res) => {
//   const talkerList = await readFile();
//   const talkerToEdit = req.body;
//   const talkerId = Number(req.params.id);
//   const index = talkerList.findIndex((talker) => talker.id === talkerId);
//   talkerList.splice(index, 1, talkerToEdit);
//   talkerList[index].id = talkerId;
//   await fs.writeFile(talkerPath, JSON.stringify(talkerList));
//   res.status(200).send(talkerToEdit);
// });

router.put('/:id',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
putIdController);

// router.delete('/:id', tokenValidations, async (req, res) => {
// const talkerId = Number(req.params.id);
// const talkerList = await readFile();
// const filteredList = talkerList.filter((talker) => talker.id !== talkerId);
// await fs.writeFile(talkerPath, JSON.stringify(filteredList));
// res.sendStatus(204);
// });

router.delete('/:id', tokenValidations, deleteIdController);

module.exports = router;