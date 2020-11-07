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
		let category = req.query.category

		let values = await AnalyzedFoodProductionData.find({ category: category }).distinct('commodity')

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
