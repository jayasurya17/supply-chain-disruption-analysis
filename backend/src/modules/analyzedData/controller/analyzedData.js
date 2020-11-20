'use strict'

import AnalyzedFoodProductionData from '../../../models/mongoDB/analyzedFoodProductionData'
import constants from '../../../utils/constants'
import csv from 'csv-parser'
import fs from 'fs'
import _ from 'underscore-node'

/**
 * Get analyzed data based on selected category, commodity and year range for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getHistoricalData = async (req, res) => {
	try {
		let commodityOne = req.query.commodityOne,
			unitOne = req.query.unitOne,
			commodityTwo = req.query.commodityTwo,
			unitTwo = req.query.unitTwo,
			commodityThree = req.query.commodityThree,
			unitThree = req.query.unitThree,
			state = req.query.state,
			startYear = Number(req.query.startYear),
			endYear = Number(req.query.endYear)

		if (startYear > endYear) {
			return res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY_STATUS).send("Start year should be less than or equal to end year")
		}

		let valuesOne = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityOne,
					unit: unitOne,
					state: state,
					year: {
						$gte: startYear, $lte: endYear
					}
				}
			},
			{
				$group: {
					_id: "$year",
					year: { $first: '$year' },
					state: { $first: '$state' },
					category: { $first: '$category' },
					commodity: { $first: '$commodity' },
					unit: { $first: '$unit' },
					yearlyValue: { $first: '$yearlyValue' }
				}
			},
			{ $sort: { year: 1 } }
			]);

		let valuesTwo = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityTwo,
					unit: unitTwo,
					state: state,
					year: {
						$gte: startYear, $lte: endYear
					}
				}
			},
			{
				$group: {
					_id: "$year",
					year: { $first: '$year' },
					state: { $first: '$state' },
					category: { $first: '$category' },
					commodity: { $first: '$commodity' },
					unit: { $first: '$unit' },
					yearlyValue: { $first: '$yearlyValue' }
				}
			},
			{ $sort: { year: 1 } }
			]);
		let valuesThree = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityThree,
					unit: unitThree,
					state: state,
					year: {
						$gte: startYear, $lte: endYear
					}
				}
			},
			{
				$group: {
					_id: "$year",
					year: { $first: '$year' },
					state: { $first: '$state' },
					category: { $first: '$category' },
					commodity: { $first: '$commodity' },
					unit: { $first: '$unit' },
					yearlyValue: { $first: '$yearlyValue' }
				}
			},
			{ $sort: { year: 1 } }
			]);

		console.log("result length-->", valuesOne.length, valuesTwo.length, valuesThree.length)

		let response = {
			filterOneData: valuesOne,
			filterTwoData: valuesTwo,
			filterThreeData: valuesThree,
		}

		if (valuesOne && valuesOne.length > 0) {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(response)
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

		if (startYear > endYear) {
			return res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY_STATUS).send("Start year should be less than or equal to end year")
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



/**
 * Get number of disasters that happened in each state for food production data.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getDisastersByState = async (req, res) => {
	try {
		let disaster = req.query.disaster
		let startYear = req.query.startYear
		let endYear = req.query.endYear

		if (startYear > endYear) {
			return res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY_STATUS).send("Start year should be less than or equal to end year")
		}

		let result = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					year: {
						$gte: startYear, $lte: endYear
					},
					disasterType: disaster
				}
			},
			{ $group: { _id: "$state", count: { $sum: 1 } } }
			]);

		let states = { 'ALABAMA': 0, 'ALASKA': 0, 'ARIZONA': 0, 'ARKANSAS': 0, 'CALIFORNIA': 0, 'COLORADO': 0, 'CONNECTICUT': 0, 'DELAWARE': 0, 'FLORIDA': 0, 'GEORGIA': 0, 'HAWAII': 0, 'IDAHO': 0, 'ILLINOIS': 0, 'INDIANA': 0, 'IOWA': 0, 'KANSAS': 0, 'KENTUCKY': 0, 'LOUISIANA': 0, 'MAINE': 0, 'MARYLAND': 0, 'MASSACHUSETTS': 0, 'MICHIGAN': 0, 'MINNESOTA': 0, 'MISSISSIPPI': 0, 'MISSOURI': 0, 'MONTANA': 0, 'NEBRASKA': 0, 'NEVADA': 0, 'NEW HAMPSHIRE': 0, 'NEW JERSEY': 0, 'NEW MEXICO': 0, 'NEW YORK': 0, 'NORTH CAROLINA': 0, 'NORTH DAKOTA': 0, 'OHIO': 0, 'OKLAHOMA': 0, 'OREGON': 0, 'PENNSYLVANIA': 0, 'RHODE ISLAND': 0, 'SOUTH CAROLINA': 0, 'SOUTH DAKOTA': 0, 'TENNESSEE': 0, 'TEXAS': 0, 'UTAH': 0, 'VERMONT': 0, 'VIRGINIA': 0, 'WASHINGTON': 0, 'WEST VIRGINIA': 0, 'WISCONSIN': 0, 'WYOMING': 0 }

		for (let row of result) {
			states[row._id] = row.count
		}

		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(states)

	} catch (error) {
		console.log(`Error while getting list of commodities based on selected category ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get analyzed data based selected categories, commodities, units, state for food production data for a given year.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getYearlyDisasterData = async (req, res) => {
	try {
		let commodityOne = req.query.commodityOne,
			unitOne = req.query.unitOne,
			commodityTwo = req.query.commodityTwo,
			unitTwo = req.query.unitTwo,
			commodityThree = req.query.commodityThree,
			unitThree = req.query.unitThree,
			state = req.query.state,
			year = req.query.year

		let valuesOne = await AnalyzedFoodProductionData.find({
			commodity: commodityOne,
			unit: unitOne,
			state: state,
			year: year
		})

		let valuesTwo = await AnalyzedFoodProductionData.find({
			commodity: commodityTwo,
			unit: unitTwo,
			state: state,
			year: year
		})

		let valuesThree = await AnalyzedFoodProductionData.find({
			commodity: commodityThree,
			unit: unitThree,
			state: state,
			year: year
		})

		let response = {
			production: {},
			disasters: {}
		}

		if (valuesOne && valuesOne.length > 0) {
			let productionData = {}
			for (let i = 0; i < valuesOne.length; i++) {
				productionData[valuesOne[i].month] = valuesOne[i].value
			}
			response.production[commodityOne] = productionData
		}

		if (valuesTwo && valuesTwo.length > 0) {
			let productionData = {}
			for (let i = 0; i < valuesTwo.length; i++) {
				productionData[valuesTwo[i].month] = valuesTwo[i].value
			}
			response.production[commodityTwo] = productionData
		}

		if (valuesThree && valuesThree.length > 0) {
			let productionData = {}
			for (let i = 0; i < valuesThree.length; i++) {
				productionData[valuesThree[i].month] = valuesThree[i].value
			}
			response.production[commodityThree] = productionData
		}

		let disasterValues = await AnalyzedFoodProductionData.find({ state: state, year: year })

		let valueOne = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityOne,
					unit: unitOne,
					state: state,
					year: year
				}
			}
			]);

		let valueTwo = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityTwo,
					unit: unitTwo,
					state: state,
					year: year
				}
			}
			]);

		let valueThree = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					commodity: commodityThree,
					unit: unitThree,
					state: state,
					year: year
				}
			}
			]);

		if (valueOne && valueOne.length > 0) {
			for (let i = 0; i < valueOne.length; i++) {
				if (valueOne[i].disasterType.length > 0) {
					response.disasters[valueOne[i].month] = []
					response.disasters[valueOne[i].month].push.apply(response.disasters[valueOne[i].month], valueOne[i].disasterType)
				}
			}
		}

		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(response)
	} catch (error) {
		console.log(`Error while getting yearly analyzed food production data ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get food production values of a commodity for a given unit for each state for a certain year range.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getFoodProductionByState = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			unit = req.query.unit,
			startYear = req.query.startYear,
			endYear = req.query.endYear

		if (startYear > endYear) {
			return res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY_STATUS).send("Start year should be less than or equal to end year")
		}

		// let states = { 'ALABAMA': 0, 'ALASKA': 0, 'ARIZONA': 0, 'ARKANSAS': 0, 'CALIFORNIA': 0, 'COLORADO': 0, 'CONNECTICUT': 0, 'DELAWARE': 0, 'FLORIDA': 0, 'GEORGIA': 0, 'HAWAII': 0, 'IDAHO': 0, 'ILLINOIS': 0, 'INDIANA': 0, 'IOWA': 0, 'KANSAS': 0, 'KENTUCKY': 0, 'LOUISIANA': 0, 'MAINE': 0, 'MARYLAND': 0, 'MASSACHUSETTS': 0, 'MICHIGAN': 0, 'MINNESOTA': 0, 'MISSISSIPPI': 0, 'MISSOURI': 0, 'MONTANA': 0, 'NEBRASKA': 0, 'NEVADA': 0, 'NEW HAMPSHIRE': 0, 'NEW JERSEY': 0, 'NEW MEXICO': 0, 'NEW YORK': 0, 'NORTH CAROLINA': 0, 'NORTH DAKOTA': 0, 'OHIO': 0, 'OKLAHOMA': 0, 'OREGON': 0, 'PENNSYLVANIA': 0, 'RHODE ISLAND': 0, 'SOUTH CAROLINA': 0, 'SOUTH DAKOTA': 0, 'TENNESSEE': 0, 'TEXAS': 0, 'UTAH': 0, 'VERMONT': 0, 'VIRGINIA': 0, 'WASHINGTON': 0, 'WEST VIRGINIA': 0, 'WISCONSIN': 0, 'WYOMING': 0 }

		// for(let i = 0; i < constants.STATES.length; i++) {
		// 	let result = await AnalyzedFoodProductionData.aggregate(
		// 		[{
		// 			$match:
		// 			{
		// 				year: {
		// 					$gte: startYear, $lte: endYear
		// 				},
		// 				commodity: commodity,
		// 				unit: unit,
		// 				state: constants.STATES[i],
		// 				month: constants.MONTH.JANUARY
		// 			}
		// 		}
		// 	]);

		// 	for(let i = 0; i < result.length; i++) {
		// 		states[result[i].state] += Number(result[i].yearlyValue)
		// 	}
		// }

		let result = await AnalyzedFoodProductionData.aggregate(
			[{
				$match:
				{
					year: {
						$gte: startYear, $lte: endYear
					},
					commodity: commodity,
					unit: unit,
					month: constants.MONTH.JANUARY
				}
			},
			{ $group: { _id: "$state", count: { $sum: "$yearlyValue" } } }
			]);

		let states = constants.STATES_COUNT

		for (let row of result) {
			states[row._id] = row.count
		}

		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(states)

	} catch (error) {
		console.log(`Error while getting food production values of a commodity for a given unit for each state for a certain year range ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
* Get food disruption percentage in production values of a commodity for a given unit for each state for 2016-2020.
* @param  {Object} req request object
* @param  {Object} res response object
*/
exports.getCovidFoodProductionDisruptionByState = async (req, res) => {
	try {
		let commodity = req.query.commodity,
			unit = req.query.unit,
			state = req.query.state,
			startYear = constants.YEAR[2015],
			endYear = constants.YEAR[2020]
		
		let data = []

		fs.createReadStream(`src/python/datasets/quarter_data.csv`)
			.pipe(csv())
			.on('data', (row) => {
				if(row.state === state && row.commodity === commodity && row.unit === unit) {
				console.log(row)
					let obj = {
						year: row.year,
						quarter: row.quarter,
						value: row.value,
						percent: row.percent
					}
					data.push(obj)
				}
			})
			.on('end', () => {
				console.log('CSV file successfully processed');
				return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(data)
			});
			
	} catch (error) {
		console.log(`Error while getting food disruption percentage in production values of a commodity for a given unit for each state for 2016-2020 ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}