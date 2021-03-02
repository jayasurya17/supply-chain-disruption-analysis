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
router.get('/foodShareByYear', validation(validator['foodShareByYear']), analysisController.getFoodShareByYear)
router.get('/quarterlyMedicineUtilizationDisruptionByState', validation(validator['quarterlyMedicineUtilizationDisruptionByState']), analysisController.getQuarterlyMedicineUtilizationDisruptionByState)
router.get('/historicalExportData', validation(validator['historicalExportData']), analysisController.getHistoricalExportData)
router.get('/historicalExportDataByState', validation(validator['historicalExportDataByState']), analysisController.getHistoricalExportDataByState)
router.get('/foodExportByState', validation(validator['dataByState']), analysisController.getFoodExportByState)
router.get('/medicineUtilizationByState', validation(validator['dataByState']), analysisController.getMedicineUtilizationByState)
router.get('/medicineUtilizationByCommodity', validation(validator['dataByCommodity']), analysisController.getMedicineUtilizationByCommodity)
router.get('/foodExportByCommodity', validation(validator['dataByCommodity']), analysisController.getFoodExportByCommodity)

module.exports = router
