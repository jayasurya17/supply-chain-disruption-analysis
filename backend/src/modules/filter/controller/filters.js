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
		// console.log(req.body);
		// let data = new AnalyzedFoodProductionData(req.body)
		// let resData = await data.save()
		// resData = resData.toJSON()

		let resData = await AnalyzedFoodProductionData.find().distinct('category')

		console.log(resData);

		if (resData && resData.length > 0) {
			return res.status(200).send(resData)
		} else {
			return res.status(204).json()
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
		console.log(req, req.query)
		let category = req.query.category
		console.log(category)

		let values = await AnalyzedFoodProductionData.find({ category: category }).distinct('commodity')
		console.log(values.length)

		if (values && values.length > 0) {
			return res.status(200).send(values)
		} else {
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting list of commodities based on selected category ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
