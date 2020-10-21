'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.deleteUser = async (req, res) => {
    var userDetails = {
        userId : req.body.userId,
        userName : req.body.userName
    }
    try {
        var checkUser = await Users.findById(userDetails.userId);
        console.log(checkUser);
        if(checkUser){

            //Delete User Profile
            var deleteProfile = await Users.deleteOne({_id : mongoose.Types.ObjectId(checkUser._id)});
            console.log(deleteProfile);
        }
    }
    catch(error){
        console.log(`Error while deleting user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error)
    }

}