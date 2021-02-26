`use strict`

import express from 'express'
let router = express.Router()
import filterController from '../controller/filters'
import validator from '../validator'
import validation from 'express-validation'

router.get('/categories', filterController.getCategories)
router.get('/commoditiesByCategory', validation(validator['commoditiesByCategory']), filterController.getCommoditiesByCategory)
router.get('/statesByCommodityAndUnit', validation(validator['statesByCommodityAndUnit']), filterController.getStatesByCommodityAndUnit)
router.get('/units', validation(validator['filterByCommodity']), filterController.getUnits)
router.get('/allDisasters', filterController.getAllDisasters)
router.get('/categoriesByDisasterType', validation(validator['categoriesByDisasterType']), filterController.getCategoriesByDisasterType)
router.get('/commoditiesByCategoryAndDisasterType', validation(validator['commoditiesByCategoryAndDisasterType']), filterController.getCommoditiesByCategoryAndDisasterType)
router.get('/unitsByCategoryAndCommodityAndDisasterType', validation(validator['unitsByCategoryAndCommodityAndDisasterType']), filterController.getUnitsByCategoryAndCommodityAndDisasterType)
router.get('/statesByCategoryAndCommodityAndUnitAndDisasterType', validation(validator['statesByCategoryAndCommodityAndUnitAndDisasterType']), filterController.getStatesByCategoryAndCommodityAndUnitAndDisasterType)
router.get('/exportCommodities', filterController.getExportCommodities)
router.get('/importCommodities', filterController.getImportCommodities)
router.get('/statesByExportCommodities', filterController.getStatesByExportCommodity)
router.get('/statesByImportCommodities', filterController.getStatesByImportCommodity)
router.get('/yearByStatesAndExportCommodities', filterController.getYearByStatesAndExportCommodities)
router.get('/yearByStatesAndImportCommodities', filterController.getYearByStatesAndImportCommodities)
router.get('/stateExport', filterController.getCommoditiesAndStatesForExportData)

module.exports = router
