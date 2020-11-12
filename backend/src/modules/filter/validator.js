`use strict`

import Joi from 'joi'

module.exports = {
	commoditiesByCategory: {
		query: {
			category: Joi.string().required(),
		},
		model: "commoditiesByCategory",
		group: "Filter",
		description: "Get list of commodities based on selected category for food production data"
	},
	filterByCategoryAndCommodity: {
		query: {
			category: Joi.string().required(),
			commodity: Joi.string().required(),
		},
		model: "filterByCategoryAndCommodity",
		group: "Filter",
		description: "Get data filtered based on selected category for food production data"
	},
	statesByCategoryAndCommodityAndUnit: {
		query: {
			categoryOne: Joi.string().required(),
			commodityOne: Joi.string().required(),
			unitOne: Joi.string().required(),
			categoryTwo: Joi.string(),
			commodityTwo: Joi.string(),
			unitTwo: Joi.string(),
			categoryThree: Joi.string(),
			commodityThree: Joi.string(),
			unitThree: Joi.string()
		},
		model: "statesByCategoryAndCommodityAndUnit",
		group: "Filter",
		description: "Get states filtered based on selected category, commodity and unit for food production data"
	}
}