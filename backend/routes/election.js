const express = require('express')
const Election = require('../models/electionModel')

const router = express.Router()

//get election
router.get('/getelection', async (req, res) => {
    try {
        const election = await Election.findOne();

        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        res.json(election);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//start election
router.post('/startelection', async (req, res) => {
    try {
        const election = await Election.findOne();

        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        election.electionStarted = true;
        election.electionEnded = false;
        await election.save();
        res.json(election);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//end election
router.post('/endelection', async (req, res) => {
    try {
        const election = await Election.findOne();

        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        if(!election.electionStarted){
            throw new Error('Election must be started before ending');
        }

        election.electionEnded = true;
        election.electionStarted = false;
        await election.save();
        res.json(election);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;