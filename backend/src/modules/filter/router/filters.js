`use strict`

import express from 'express'
let router = express.Router()
import filterController from '../controller/filters'
import validator from '../validator'
import validation from 'express-validation'

router.get('/categories', filterController.getCategories)
router.get('/commoditiesByCategory', validation(validator['commoditiesByCategory']), filterController.getCommoditiesByCategory)

module.exports = router
