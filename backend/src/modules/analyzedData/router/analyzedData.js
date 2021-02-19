`use strict`

import express from 'express'
let router = express.Router()
import analysisController from '../controller/analyzedData'
import validator from '../validator'
import validation from 'express-validation'

router.get('/historicalData', validation(validator['historicalData']), analysisController.getHistoricalData)
router.get('/historicalDataByState', validation(validator['historicalDataByState']), analysisController.getHistoricalDataByState)
router.get('/disastersByState', validation(validator['disastersByState']), analysisController.getDisastersByState)
router.get('/yearlyDisasterData', validation(validator['yearlyDisasterData']), analysisController.getYearlyDisasterData)
router.get('/foodProductionByState', validation(validator['foodProductionByState']), analysisController.getFoodProductionByState)
router.get('/covidFoodProductionDisruptionByState', validation(validator['covidFoodProductionDisruptionByState']), analysisController.getCovidFoodProductionDisruptionByState)

router.get('/foodShareByContinent', validation(validator['foodShareByContinent']), analysisController.getFoodShareByContinent)

module.exports = router
