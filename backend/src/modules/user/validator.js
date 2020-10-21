`use strict`

import Joi from 'joi'

module.exports = {
	signup: {
		body: {
			name: Joi.string().required(),
			email: Joi.string().email(),
			phone: Joi.number(),
			dateOfBirth: Joi.string().required(),
			password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
		},
		model: "createUser",
		group: "User",
		description: "Create user and save details in database"
	},
	login: {
		body: {
			loginId: Joi.string().required(),
			password: Joi.string().required()
		},
		model: "loginUser",
		group: "User",
		description: "Login user and send auth token and user details in response"
	},
	getProfile: {
		path: {
			userId: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'getUserDetails',
		group: "User",
		description: "Get user profile details based on userid"
	},
	updateProfile: {
		body: {
			userId: Joi.string(),
			name: Joi.string(),
			userName: Joi.string().max(15),
			// city: Joi.string().optional(),
			// state: Joi.string(),
			// zipcode: Joi.string().regex(/^(?!0{5})(\d{5})(?!-?0{4})(|-\d{4})?$/),
			// description: Joi.string().max(160),
			// password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
			// phone: Joi.number(),
			email: Joi.string().email(),
		},
		payload: {
			maxBytes: 209715200,
			output: 'file',
			parse: true
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'updateUserDetails',
		group: "User",
		description: "Update user deatils based on userid"
	},
	deactivateProfile: {
		path: {
			userId: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'deactivateUserDetails',
		group: "User",
		description: "Deactivate user based on userid"
	},
	logout: {
		header: {
			authorization: Joi.string().required()
		},
		model: 'logout',
		group: "User",
		description: "Logout user and delete the token from database"
	},
	deleteUser: {
		path: {
			userId: Joi.string().required(),
			userName: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'deleteUserDetails',
		group: "User",
		description: "Delete all user details"
	},
}