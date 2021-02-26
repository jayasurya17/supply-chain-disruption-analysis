`use strict`

import mongoose from 'mongoose'

const AnalyzedMedicineUtilizationData = new mongoose.Schema({
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
    }
}, { versionKey: false })

export default mongoose.model('analyzedMedicineUtilizationData', AnalyzedMedicineUtilizationData)
