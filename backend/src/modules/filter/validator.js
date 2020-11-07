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
	}
}