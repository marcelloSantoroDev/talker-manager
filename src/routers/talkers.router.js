const express = require('express');

const router = express.Router();

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

router.get('/search', tokenValidations, searchController);

router.get('/:id', getIdController);

router.get('/', getRootController);

router.post('/',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
postRootController);

router.put('/:id',
tokenValidations,
nameValidations,
ageValidations,
talkValidations,
watchedAtValidations,
rateValidations,
putIdController);

router.delete('/:id', tokenValidations, deleteIdController);

module.exports = router;