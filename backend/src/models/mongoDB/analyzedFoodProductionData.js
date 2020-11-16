`use strict`

import mongoose from 'mongoose'

const AnalyzedFoodProductionData = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    commodity: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    yearlyValue: {
        type: Number,
        required: true
    },
    disasterType: [{
        type: String,
        required: true
    }],
    endYear: {
        type: Number,
        required: true
    },
    endMonth: {
        type: String,
        required: true
    },
}, { versionKey: false })

export default mongoose.model('analyzedFoodProductionData', AnalyzedFoodProductionData)
