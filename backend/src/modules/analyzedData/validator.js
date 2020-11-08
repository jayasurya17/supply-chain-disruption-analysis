`use strict`

import Joi from 'joi'

module.exports = {
	getHistoricalData: {
		query: {
			category: Joi.string().required(),
			commodity: Joi.string().required(),
			startYear: Joi.string().required(),
			endYear: Joi.string().required(),
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
	}
}