import mongoose from 'mongoose'

'use strict'

const DisasterData = new mongoose.Schema({
    year: {
		type: Number,
        maxlength: 4,
        required: true
    },
	seq: {
		type: String,
		required: true,
	},
	dissaterGroup: {
		type: String,
		required: true,
	},
	dissaterSubgroup: {
		type: String,
        maxlength: 30,
        required: true
	},
	disasterType: {
		type: String,
        required: true
    },
    disasterSubtype: {
		type: String,
        required: true
    },
    eventName: {
		type: String,
        required: true
    },
    country: {
		type: String,
        required: true
    },
    region: {
		type: String,
        required: true
    },
    continent: {
		type: String,
        required: true
    },
    location: {
		type: String,
        required: true
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
}, { versionKey: false })

export default mongoose.model('disasterData', DisasterData)
