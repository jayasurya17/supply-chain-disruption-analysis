`use strict`

import Joi from 'joi'

module.exports = {
	getHistoricalData: {
		body: {
			categoryOne: Joi.string().required(),
			commodityOne: Joi.string().required(),
			unitOne: Joi.string().required(),
			categoryTwo: Joi.string(),
			commodityTwo: Joi.string(),
			unitTwo: Joi.string(),
			categoryThree: Joi.string(),
			commodityThree: Joi.string(),
			unitThree: Joi.string(),
			state: Joi.string().required(),
			startYear: Joi.number().required(),
			endYear: Joi.number().required(),
			},
		model: "getHistoricalData",
		group: "AnalyzedData",
		description: "Get analyzed data based on selected category, commodity and year range for food production data"
	},
	getHistoricalDataByState: {
		query: {
			category: Joi.string().required(),
			commodity: Joi.string().required(),
			startYear: Joi.string().required(),
			endYear: Joi.string().required(),
			state: Joi.string().required()
			},
		model: "getHistoricalDataByState",
		group: "AnalyzedData",
		description: "Get analyzed data based on selected category, commodity, state and year range for food production data"
	},
	disastersByState: {
		query: {
			disaster: Joi.string().required(),
			startYear: Joi.number().required(),
			endYear: Joi.number().required(),
		},
		model: "disastersByState",
		group: "Filter",
		description: "Get number of disasters that happened in each state for food production data"
	}
}