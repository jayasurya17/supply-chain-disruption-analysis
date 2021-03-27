'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import uuidv1 from 'uuid/v1'
import bcrypt from 'bcrypt';

import { updatePassword } from '../../../utils/updateHashPassword'

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createUser = async (req, res) => {
	let createdUser

	let filter = {}
	try {
		if (req.body.email) {
			filter.email = req.body.email
		} else {
			filter.phone = req.body.phone
		}
		const user = await Users.findOne(filter)
		if (user) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		let userObj = req.body

		userObj['role'] = constants.ROLES.USER;

		let newUser = new Users(userObj)
		createdUser = await newUser.save()
		createdUser = createdUser.toJSON()
		delete createdUser.password
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdUser)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Login user and send auth token and user details in response.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.loginUser = async (req, res) => {
	try {
		var user

		var isAuth = false
		if (isNaN(req.body.loginId)) {
			user = await Users.findOne({
				$or: [
					{
						email: req.body.loginId
					}
				]
			})
		} else {
			user = await Users.findOne({
				$or: [
					{
						phone: req.body.loginId
					}
				]
			})
		}

		if (user) {

			const isValidUser = await bcrypt.compare(req.body.password, user.password);

			if (isValidUser) {
				const token = user.generateToken()
				user = user.toJSON()
				delete user.password // Delete password from the User object retrieved from the DB.

				await Users.findByIdAndUpdate(user._id, {
						jwtToken: token,
						isActive: true,
				});
        isAuth = true

        res.cookie('access_token', token); // Setting the Access token in the cookie, as other API call's can use the access token to authenticate themselves.
        res.status(constants.STATUS_CODE.SUCCESS_STATUS)
        return res.send(user);
			}
		}
		if (!isAuth) {
			return res
				.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS)
				.send(constants.MESSAGES.AUTHORIZATION_FAILED)
		}
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.validateToken = async (req, res) => {
    try {

        let user;
        user = await Users.findOne({
            _id: req.userId
        });
        user = user.toJSON();
        delete user.password;

        res.status(constants.STATUS_CODE.SUCCESS_STATUS);
        return res.send(user);
    } catch(error) {
        console.log(error);
        return res
            .status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS)
            .send(constants.MESSAGES.AUTHORIZATION_FAILED)
    }
}

/**
 * Get user profile details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUserProfile = async (req, res) => {
	try {
		var profileDetails;

		profileDetails = await client.hgetall("profiledata_" + req.params.userId, function (err, success) {
			if (err || !success) {
				console.log(err, !success)
				return null;
			}
			else {
				delete success.password
				return success;
			}
		})


		if (profileDetails.length > 0) {
			return res.status(200).send(profileDetails);
		}
		// let fromRedis = await client.hgetall("profiledata_" + req.params.userId)
		// console.log("From Redis ", fromRedis);

		let details = await Users.findById(
			mongoose.Types.ObjectId(req.params.userId)
		)
		if (details) {
			details = details.toJSON()
			delete details.password
			return res.status(200).send(details)
		} else {
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Update user details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.updateUserProfile = async (req, res) => {
	console.log(req.body)
	try {
		if (req.body.email == undefined && req.body.phone == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}

		let filter = [{ userName: req.body.userName }]
		if (req.body.email) {
			filter.push({ email: req.body.email })
		}
		if (req.body.phone) {
			filter.push({ phone: req.body.phone })
		}
		const user = await Users.findOne({
			_id: {
				$ne: mongoose.Types.ObjectId(req.body.userId)
			},
			$or: filter
		})
		if (user) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_DETAILS_ALREADY_EXISTS)
		}

		let userObj = req.body

		if(req.file){
            userObj.imageURL = req.file.location
            console.log("Image received:", userObj.imageURL)
		}

		// updating password
		if(req.body.password) {
			userObj.password = updatePassword(req.body.password)
		}

		let details = await Users.findByIdAndUpdate(
			mongoose.Types.ObjectId(req.body.userId),
			{
				$set: userObj
			},
			null,
			null
		)
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Deactive user based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.deactivateUserProfile = async (req, res) => {
	try {
		let details = await Users.findByIdAndUpdate(
			mongoose.Types.ObjectId(req.params.userId),
			{
				$set: {
					isActive: false
				}
			},
			null,
			null
		)

		if (details) {
			return res.status(200).json()
		} else {
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.logout = async (req, res) => {
	try {
		let user = await Users.findById(
			mongoose.Types.ObjectId(req.userId)
		)
		if (user) {
			await Users.findByIdAndUpdate(req.userId, {
				$pull: {
					jwtToken: { token : req.tokenToDelete}
				}
			});
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).json()
		} else {
			return res.status(401).json()
		}
	} catch (error) {
		console.log(`Error while logging out user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
