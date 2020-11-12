'use strict'

import AnalyzedFoodProductionData from '../../../models/mongoDB/analyzedFoodProductionData'
import constants from '../../../utils/constants'

/**
 * Get list of category filter values for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getCategories = async (req, res) => {
	try {
		let resData = await AnalyzedFoodProductionData.find().distinct('category')

		if (resData && resData.length > 0) {
			resData.push(constants.ALL_CATEGORIES)
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting food production category filter values ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}



/**
 * Get list of commodities based on selected category for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getCommoditiesByCategory = async (req, res) => {
	try {
		let category = req.query.category,
			filter = {}

		if (category != constants.ALL_CATEGORIES) {
			filter['category'] = category
		}

		let values = await AnalyzedFoodProductionData.find(filter).distinct('commodity')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of commodities based on selected category ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}




/**
 * Get list of all disasters for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllDisasters = async (req, res) => {
	try {

		let values = await AnalyzedFoodProductionData.find().distinct('disasterType')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of commodities based on selected category ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of states based on selected category, commodity and unit for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getStatesByCategoryAndCommodityAndUnit = async (req, res) => {
	try {
		let categoryOne = req.query.categoryOne,
			commodityOne = req.query.commodityOne,
			unitOne = req.query.unitOne,
			categoryTwo = req.query.categoryTwo,
			commodityTwo = req.query.commodityTwo,
			unitTwo = req.query.unitTwo,
			categoryThree = req.query.categoryThree,
			commodityThree = req.query.commodityThree,
			unitThree = req.query.unitThree

		let valuesOne = await AnalyzedFoodProductionData.find({ category: categoryOne, commodity: commodityOne, unit: unitOne}).distinct('state')
		let valuesTwo = await AnalyzedFoodProductionData.find({ category: categoryTwo, commodity: commodityTwo, unit: unitTwo}).distinct('state')
		let valuesThree = await AnalyzedFoodProductionData.find({ category: categoryThree, commodity: commodityThree, unit: unitThree}).distinct('state')

		let intersection = valuesOne

		if (valuesTwo && valuesTwo.length) {
			intersection = intersection.filter(x => valuesTwo.includes(x))
			}

		if (valuesThree && valuesThree.length) {
			intersection = intersection.filter(x => valuesThree.includes(x))
		}

		if (intersection && intersection.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(intersection)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of states based on selected category, commodity and unit ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of unites based on selected category and commodity for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUnits = async (req, res) => {
	try {
		let category = req.query.category,
			commodity = req.query.commodity

		let values = await AnalyzedFoodProductionData.find({ category: category, commodity: commodity }).distinct('unit')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of units based on selected category and commodity ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
