const express = require('express')
const fetch = require('node-fetch');
const Constituent = require('../models/constituentModel')

const router = express.Router()

//all results
router.get('/constituents', async (req, res) => {
    try {
        // Get all constituents
        const constituents = await Constituent.find();

        // Loop through each constituent and determine the winning party
        const results = constituents.map((constituent) => {
            const winningParty = constituent.parties.reduce((prevParty, currentParty) =>
                currentParty.voteCount > prevParty.voteCount ? currentParty : prevParty
            );

            return {
                constituentName: constituent.name,
                winningParty: {
                    name: winningParty.name,
                    voteCount: winningParty.voteCount,
                },
            };
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//single constituent result
router.get('/constituents/:constituentName', async (req, res) => {
    try {
        const { constituentName } = req.params;

        // Find the constituent by name
        const constituent = await Constituent.findOne({ name: constituentName });

        if (!constituent) {
            return res.status(404).json({ error: 'Constituent not found' });
        }

        // Extract result information from the constituent
        const result = {
            constituency: constituent.name,
            result: constituent.parties.map((party) => ({
                name: party.candidateName, // Assuming one candidate per party
                party: party.name,
                vote: party.voteCount,
            })),
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//overall results
router.get('/all', async (req, res) => {
    try {
        // Make a GET request to the constituents endpoint
        const response = await fetch('http://localhost:4000/gevs/results/constituents');
        const constituentsResults = await response.json();

        // Count the number of wins for each party
        const partyWins = {};
        constituentsResults.forEach((constituent) => {
            const winningParty = constituent.winningParty;

            if (winningParty && winningParty.voteCount > 0) {
                const winningPartyName = winningParty.name;

                if (!partyWins[winningPartyName]) {
                    partyWins[winningPartyName] = 0;
                }

                partyWins[winningPartyName]++;
            }
        });

        // Determine the overall winner based on winning at least 3 seats
        const overallWinner = Object.keys(partyWins).find((party) => partyWins[party] >= 3);

        // Create the response in the required format
        const result = {
            status: overallWinner ? 'Completed' : 'Hung Parliament',
            winner: overallWinner || 'No Winner',
            seats: Object.keys(partyWins).map((party) => ({
                party,
                seat: partyWins[party].toString(),
            })),
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

module.exports = router