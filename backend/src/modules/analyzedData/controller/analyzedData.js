'use strict'

import AnalyzedFoodProductionData from '../../../models/mongoDB/analyzedFoodProductionData'
import constants from '../../../utils/constants'

/**
 * Get analyzed data based on selected category, commodity and year range for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getHistoricalData = async (req, res) => {
	try {
		let category = req.query.category,
			commodity = req.query.commodity,
			startYear = req.query.startYear,
			endYear = req.query.endYear

			if(startYear > endYear) {
				return res.status(422).send("Start year should be less than or equal to end year")
			}

		let values = await AnalyzedFoodProductionData.find({
			category: category, commodity: commodity, year: {
				$gte: startYear, $lte: endYear
			}
		})

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting analyzed food production data ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get analyzed data based on selected category, commodity and year range for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getHistoricalDataByState = async (req, res) => {
	try {
		let category = req.query.category,
			commodity = req.query.commodity,
			startYear = req.query.startYear,
			endYear = req.query.endYear,
			state = req.query.state

			if(startYear > endYear) {
				return res.status(422).send("Start year should be less than or equal to end year")
			}

		let values = await AnalyzedFoodProductionData.find({
			category: category, commodity: commodity, state: state, year: {
				$gte: startYear, $lte: endYear
			}
		})

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting analyzed food production data statewise ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
