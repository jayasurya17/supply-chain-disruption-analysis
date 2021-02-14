`use strict`

import mongoose from 'mongoose'

const AnalyzedFoodExportData = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    commodity: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
}, { versionKey: false })

export default mongoose.model('analyzedFoodExportData', AnalyzedFoodExportData)
