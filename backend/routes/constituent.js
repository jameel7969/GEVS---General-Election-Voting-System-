const Constituent = require('../models/constituentModel');
const express = require('express');
const { getConstituent, updateVotes, getAllConstituents } = require('../controllers/constituentController');

const router = express.Router();

//get all constituents
router.get('/constituents', getAllConstituents)

//get single constituent
router.get('/:name', getConstituent)

router.post('/vote/:constituentName/:partyName', updateVotes)

module.exports = router;