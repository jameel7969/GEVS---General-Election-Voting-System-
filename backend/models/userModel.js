const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Election = require('../models/electionModel')
const Constituent = require('../models/constituentModel')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    constituency: {
        type: String,
        required: true,
    },
    uvc: {
        type: String,
        required: true,
    },
    voted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

})

//signup user
userSchema.statics.signup = async function (email, password, name, dob, constituency, uvc, isAdmin) {
    //validation
    if (!email || !password || !name || !dob || !constituency || !uvc) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong enough')
    // }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = this.create({ email, password: hash, name, dob, constituency, uvc, isAdmin })
    return user

}

//login user
userSchema.statics.login = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    if (user.isAdmin) {
        // Check if the election is already created
        const existingElection = await Election.findOne();

        if (!existingElection) {
            // Create the election if it doesn't exist
            const newElection = new Election();
            await newElection.save();
        }

        const existingConstituents = await Constituent.find();

        if (existingConstituents.length === 0) {
            // Create constituents if none exist
            const constituentsData = [
                {
                    name: 'Shangri-la-Town',
                    parties: [
                        { name: 'Blue Party', candidateName: 'Sara Jones', voteCount: 0 },
                        { name: 'Red Party', candidateName: 'Shawn Moody', voteCount: 0 },
                        { name: 'Yellow Party', candidateName: 'Melanie Becker', voteCount: 0 },
                        { name: 'Independent', candidateName: 'Penelope Daves', voteCount: 0 },
                    ]
                },
                {
                    name: 'Northern-Kunlun-Mountain',
                    parties: [
                        { name: 'Blue Party', candidateName: 'John Smith', voteCount: 0 },
                        { name: 'Red Party', candidateName: 'Mary Johnson', voteCount: 0 },
                        { name: 'Yellow Party', candidateName: 'Lisa Williams', voteCount: 0 },
                        { name: 'Independent', candidateName: 'Bob Brown', voteCount: 0 },
                    ]
                },
                {
                    name: 'Western-Shangri-la',
                    parties: [
                        { name: 'Blue Party', candidateName: 'Carol Jones', voteCount: 0 },
                        { name: 'Red Party', candidateName: 'Mike Miller', voteCount: 0 },
                        { name: 'Yellow Party', candidateName: 'Albert Davis', voteCount: 0 },
                        { name: 'Independent', candidateName: 'Randy Wilson', voteCount: 0 },
                    ]
                },
                {
                    name: 'Naboo-Vallery',
                    parties: [
                        { name: 'Blue Party', candidateName: 'Larry Taylor', voteCount: 0 },
                        { name: 'Red Party', candidateName: 'Lois Moore', voteCount: 0 },
                        { name: 'Yellow Party', candidateName: 'Jesse Rodriguez', voteCount: 0 },
                        { name: 'Independent', candidateName: 'Ernest Anderson', voteCount: 0 },
                    ]
                },
                {
                    name: 'New-Felucia',
                    parties: [
                        { name: 'Blue Party', candidateName: 'Henry Jackson', voteCount: 0 },
                        { name: 'Red Party', candidateName: 'Michelle Martinez', voteCount: 0 },
                        { name: 'Yellow Party', candidateName: 'Frank Rodriguez', voteCount: 0 },
                        { name: 'Independent', candidateName: 'Shirley Lee', voteCount: 0 },
                    ]
                },
                // Add more constituents as needed
            ];

            await Constituent.insertMany(constituentsData);
        }
    }

    return user
}


module.exports = mongoose.model('User', userSchema)