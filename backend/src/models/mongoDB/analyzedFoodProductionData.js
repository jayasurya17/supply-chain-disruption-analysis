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
    dataItem: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    disasterType: [{
        type: String,
        required: true
    }],
}, { versionKey: false })

export default mongoose.model('analyzedFoodProductionData', AnalyzedFoodProductionData)
