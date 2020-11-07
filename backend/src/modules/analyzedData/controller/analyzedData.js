'use strict'

import AnalyzedFoodProductionData from '../../../models/mongoDB/analyzedFoodProductionData'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'

/**
 * Get analyzed data based on selected category, commodity and year range for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getHistoricalData = async (req, res) => {
	try {
		let category = req.params.category,
			commodity = req.params.commodity,
			startYear = Number(req.params.startYear),
			endYear = Number(req.params.endYear)

		let values = AnalyzedFoodProductionData.find({
			category: category, commodity: commodity, year: {
				$gte: startYear, $lte: endYear
			}
		})

		if (values && values.length > 0) {
			details = details.toJSON()
			return res.status(200).send(values)
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
