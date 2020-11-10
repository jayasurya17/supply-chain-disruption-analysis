`use strict`

import express from 'express'
let router = express.Router()
import analysisController from '../controller/analyzedData'
import validator from '../validator'
import validation from 'express-validation'

router.get('/historicalData', validation(validator['getHistoricalData']), analysisController.getHistoricalData)
router.get('/historicalDataByState', validation(validator['getHistoricalDataByState']), analysisController.getHistoricalDataByState)
router.get('/disastersByState', validation(validator['disastersByState']), analysisController.getDisastersByState)

module.exports = router
