const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionStarted: { type: Boolean, default: false },
  electionEnded: { type: Boolean, default: false },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
