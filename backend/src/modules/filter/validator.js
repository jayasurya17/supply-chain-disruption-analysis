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
	filterByCommodity: {
		query: {
			commodity: Joi.string().required(),
		},
		model: "filterByCategoryAndCommodity",
		group: "Filter",
		description: "Get data filtered based on selected category for food production data"
	},
	statesByCommodityAndUnit: {
		query: {
			commodityOne: Joi.string().required(),
			unitOne: Joi.string().required(),
			commodityTwo: Joi.string(),
			unitTwo: Joi.string(),
			commodityThree: Joi.string(),
			unitThree: Joi.string(),
			startYear: Joi.number(),
			endYear: Joi.number()
		},
		model: "statesByCommodityAndUnit",
		group: "Filter",
		description: "Get states filtered based on selected commodity and unit for food production data"
	},
	categoriesByDisasterType: {
		query: {
			disasterType: Joi.string().required()
		},
		model: "categoriesByDisasterType",
		group: "Filter",
		description: "Get categories filtered based on selected disaster type"
	},
	commoditiesByCategoryAndDisasterType: {
		query: {
			disasterType: Joi.string().required(),
			category: Joi.string().required()
		},
		model: "commoditiesByCategoryAndDisasterType",
		group: "Filter",
		description: "Get commodities filtered filtered based on selected disaster type and category"
	},
	unitsByCategoryAndCommodityAndDisasterType: {
		query: {
			disasterType: Joi.string().required(),
			category: Joi.string().required(),
			commodity: Joi.string().required()
		},
		model: "unitsByCategoryAndCommodityAndDisasterType",
		group: "Filter",
		description: "Get units filtered based filtered based on selected disaster type, category and commodity"
	},
	statesByCategoryAndCommodityAndUnitAndDisasterType: {
		query: {
			disasterType: Joi.string().required(),
			category: Joi.string().required(),
			commodity: Joi.string().required(),
			unit : Joi.string().required()
		},
		model: "statesByCategoryAndCommodityAndUnitAndDisasterType",
		group: "Filter",
		description: "Get states filtered based on selected disaster type, category, commodity and unit"
	},
	statesByExportCommodities: {
		query: {
			commodity: Joi.string().required(),
		},
		model: "statesByExportCommodities",
		group: "Filter",
		description: "Get list of states based on selected commodity for food export data"
	},
	statesByImportCommodities: {
		query: {
			commodity: Joi.string().required(),
		},
		model: "statesByImportCommodities",
		group: "Filter",
		description: "Get list of states based on selected commodity for food import data"
	},
	yearByStatesAndExportCommodities: {
		query: {
			commodity: Joi.string().required(),
			state: Joi.string().required()
		},
		model: "yearByStatesAndExportCommodities",
		group: "Filter",
		description: "Get list of years based on selected commodity and state for food export data"
	},
	yearByStatesAndImportCommodities: {
		query: {
			commodity: Joi.string().required(),
			state: Joi.string().required()
		},
		model: "yearByStatesAndImportCommodities",
		group: "Filter",
		description: "Get list of years based on selected commodity and state for food import data"
	}
}