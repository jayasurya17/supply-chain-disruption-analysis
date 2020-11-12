`use strict`

import express from 'express'
let router = express.Router()
import filterController from '../controller/filters'
import validator from '../validator'
import validation from 'express-validation'

router.get('/categories', filterController.getCategories)
router.get('/commoditiesByCategory', validation(validator['commoditiesByCategory']), filterController.getCommoditiesByCategory)
router.get('/statesByCategoryAndCommodityAndUnit', validation(validator['statesByCategoryAndCommodityAndUnit']), filterController.getStatesByCategoryAndCommodityAndUnit)
router.get('/units', validation(validator['filterByCategoryAndCommodity']), filterController.getUnits)
router.get('/allDisasters', filterController.getAllDisasters)

module.exports = router
