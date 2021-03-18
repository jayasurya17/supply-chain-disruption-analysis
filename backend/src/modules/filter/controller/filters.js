'use strict'

import AnalyzedFoodProductionData from '../../../models/mongoDB/analyzedFoodProductionData'
import AnalyzedFoodExportData from '../../../models/mongoDB/analyzedFoodExportData'
import AnalyzedFoodImportData from '../../../models/mongoDB/analyzedFoodImportData'
import AnalyzedFoodStateExportData from '../../../models/mongoDB/analyzedFoodStateExportData'
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
exports.getStatesByCommodityAndUnit = async (req, res) => {
	try {
		let commodityOne = req.query.commodityOne,
			unitOne = req.query.unitOne,
			commodityTwo = req.query.commodityTwo,
			unitTwo = req.query.unitTwo,
			commodityThree = req.query.commodityThree,
			unitThree = req.query.unitThree,
			startYear = req.query.startYear ? Number(req.query.startYear) : 1980,
			endYear = req.query.endYear? Number(req.query.endYear) : 2020

		let valuesOne = await AnalyzedFoodProductionData.find({
			commodity: commodityOne, unit: unitOne, year: {
				$gte: startYear, $lte: endYear
			}
		}).distinct('state')

		let valuesTwo = await AnalyzedFoodProductionData.find({
			commodity: commodityTwo, unit: unitTwo, year: {
				$gte: startYear, $lte: endYear
			}
		}).distinct('state')

		let valuesThree = await AnalyzedFoodProductionData.find({
			commodity: commodityThree, unit: unitThree, year: {
				$gte: startYear, $lte: endYear
			}
		}).distinct('state')

		let intersection = valuesOne

		if(commodityTwo) {
			if (valuesTwo && valuesTwo.length >=0 ) {
				intersection = intersection.filter(x => valuesTwo.includes(x))
			}
		}

		if(commodityThree) {
			if (valuesThree && valuesThree.length >=0 ) {
				intersection = intersection.filter(x => valuesThree.includes(x))
			}
		}

		if (intersection && intersection.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(intersection)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of states based on selected commodity and unit ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of units based on selected category and commodity for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUnits = async (req, res) => {
	try {
		let commodity = req.query.commodity

		let values = await AnalyzedFoodProductionData.find({ commodity: commodity }).distinct('unit')

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

/**
 * Get list of category filter values based on disaster type for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getCategoriesByDisasterType = async (req, res) => {
	try {
		let disasterType = req.query.disasterType

		let resData = await AnalyzedFoodProductionData.find({ disasterType: disasterType }).distinct('category')

		if (resData && resData.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting food production category filter values based on disaster type ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of commodities based on selected category and disaster type for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getCommoditiesByCategoryAndDisasterType = async (req, res) => {
	try {
		let category = req.query.category,
			disasterType = req.query.disasterType

		let resData = await AnalyzedFoodProductionData.find({ disasterType: disasterType, category, category }).distinct('commodity')
	
		if (resData && resData.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of commodities based on selected category and disaster type ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of units based on selected category, commodity and disaster type for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUnitsByCategoryAndCommodityAndDisasterType = async (req, res) => {
	try {
		let category = req.query.category,
			commodity = req.query.commodity,
			disasterType = req.query.disasterType

		let values = await AnalyzedFoodProductionData.find({ disasterType: disasterType, category: category, commodity: commodity }).distinct('unit')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of units based on selected category, commodity and disaster type ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of states based on selected category, commodity, unit and disaster type for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getStatesByCategoryAndCommodityAndUnitAndDisasterType = async (req, res) => {
	try {
		let category = req.query.category,
			commodity = req.query.commodity,
			unit = req.query.unit,
			disasterType = req.query.disasterType

		let values = await AnalyzedFoodProductionData.find({ disasterType: disasterType, category: category, commodity: commodity, unit: unit }).distinct('state')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}

	} catch (error) {
		console.log(`Error while getting list of states based on selected category, commodity, unit and disaster type ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of commodity filter values for food export data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getExportCommodities = async (req, res) => {
	try {
		let resData = await AnalyzedFoodExportData.find().distinct('commodity')

		if (resData && resData.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting food export commodity filter values ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of commodity filter values for food import data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getImportCommodities = async (req, res) => {
	try {
		let resData = await AnalyzedFoodImportData.find().distinct('commodity')

		if (resData && resData.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting food import commodity filter values ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of state based on selected commodity for food export data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getStatesByExportCommodity = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			filter = {}

		filter['commodity'] = commodity

		let values = await AnalyzedFoodExportData.find(filter).distinct('state')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of states based on selected export commodity ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of state based on selected commodity for food import data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getStatesByImportCommodity = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			filter = {}

		filter['commodity'] = commodity

		let values = await AnalyzedFoodImportData.find(filter).distinct('state')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of states based on selected import commodity ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of years based on selected state and commodity for food export data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getYearByStatesAndExportCommodities = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			state = req.query.state,
			filter = {}

			filter['commodity'] = commodity
			filter['state'] = state

		let values = await AnalyzedFoodExportData.find(filter).distinct('year')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of years based on selected export commodity and state ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of years based on selected state and commodity for food import data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getYearByStatesAndImportCommodities = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			state = req.query.state,
			filter = {}

			filter['commodity'] = commodity
			filter['state'] = state

		let values = await AnalyzedFoodImportData.find(filter).distinct('year')

		if (values && values.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(values)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of years based on selected import commodity and state ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of commodity and state filter values for food state export data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getCommoditiesAndStatesForExportData = async (req, res) => {
	try {
		let stateData = await AnalyzedFoodStateExportData.find().distinct('state'),
			commodityData = await AnalyzedFoodStateExportData.find().distinct('commodity'),
			resData = {}

		if (stateData && commodityData && stateData.length > 0 && commodityData.length > 0) {
			resData['stateOptions'] = stateData
			resData['commodityOptions'] = commodityData
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resData)
		} else {
			return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).json()
		}
	} catch (error) {
		console.log(`Error while getting list of commodity and state filter values for food state export data ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}