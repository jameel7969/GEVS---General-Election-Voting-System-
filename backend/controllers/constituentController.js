const mongoose = require('mongoose');
const Constituent = require('../models/constituentModel');

//getting all constituent data
const getAllConstituents = async (req, res) => {
  try {
    const constituents = await Constituent.find();

    res.status(200).json(constituents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//getting constituent data
const getConstituent = async (req, res) => {
  const name = req.params.name;

  try {
    const constituent = await Constituent.findOne({ name: name });
    res.status(200).json(constituent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//updating votes
const updateVotes = async (req, res) => {
  try {
    const { constituentName, partyName } = req.params;

    // Find the constituent in the database
    const constituent = await Constituent.findOne({ name: constituentName });

    if (!constituent) {
      return res.status(404).json({ error: 'Constituent not found' });
    }

    // Find the party within the constituent
    const party = constituent.parties.find((p) => p.name === partyName);

    if (!party) {
      return res.status(404).json({ error: 'Party not found in the constituent' });
    }

    // Increment the vote count for the party
    party.voteCount += 1;

    // Save the updated constituent to the database
    await constituent.save();

    res.json(constituent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getConstituent, updateVotes, getAllConstituents };