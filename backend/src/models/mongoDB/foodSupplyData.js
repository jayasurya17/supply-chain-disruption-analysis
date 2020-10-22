`use strict`

import mongoose from 'mongoose'

const FoodSupplyData = new mongoose.Schema({
	area: {
		type: String,
		maxlength: 50,
		required: true,
	},
	itemCode: {
		type: String,
		maxlength: 15,
		required: true,
	},
	item: {
		type: String,
        maxlength: 30,
        required: true
	},
	elementCode: {
		type: String,
        maxlength: 15,
        required: true
    },
    element: {
		type: String,
        maxlength: 30,
        required: true
    },
    year: {
		type: Number,
        required: true
    },
    unit: {
		type: String,
        maxlength: 15,
        required: true
    },
    value: {
		type: Number,
        required: true
    },
    flag: {
		type: String,
        maxlength: 2
	},
}, { versionKey: false })

export default mongoose.model('foodSupplyData', FoodSupplyData)
