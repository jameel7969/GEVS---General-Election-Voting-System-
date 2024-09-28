const mongoose = require('mongoose');

const ConstituentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parties: [
        {
            name: { type: String, required: true },
            candidateName: { type: String, required: true },
            voteCount: { type: Number, default: 0 },
        },
    ],
});

ConstituentSchema.statics.addConstituent = async function (constituentData) {
    const newConstituent = new this(constituentData);
    return newConstituent.save();
};

module.exports = mongoose.model('Constituent', ConstituentSchema);