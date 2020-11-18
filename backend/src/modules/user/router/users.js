`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import userRemover from '../controller/removeUser'
import validator from '../validator'
import validation from 'express-validation'
require('../../../middlewares/passport')
import passport from 'passport'
import upload from '../../../middlewares/imageUpload'
import {ensureUser} from '../../../middlewares/userTokenValidator'

router.post('/signup', validation(validator['signup']), userController.createUser)
router.post('/login', validation(validator['login']), userController.loginUser)
router.post(
    '/validateToken', 
    passport.authenticate('jwt', { session: false }), /* Authenticate if the token is even valid (Preliminary check) */
    ensureUser, userController.validateToken, /* enusure if there is a user like that in the system. */
    );
router.get('/profile/:userId', validation(validator['getProfile']), passport.authenticate('jwt', { session: false }), ensureUser, userController.getUserProfile)
router.put('/profile/', upload.single('image'), validation(validator['updateProfile']) , passport.authenticate('jwt', { session: false }), ensureUser, userController.updateUserProfile)
router.delete('/deactivateAccount/:userId', validation(validator['deactivateProfile']) , passport.authenticate('jwt', { session: false }), ensureUser, userController.deactivateUserProfile)
router.put('/logout',  validation(validator['logout']), passport.authenticate("jwt", { session: false }), passport.authenticate("jwt", { session: false }), ensureUser, userController.logout)
router.post('/deleteUser',/* validation(validator['deleteUser']), passport.authenticate('jwt', { session: false }), ensureUser, */ userRemover.deleteUser)

module.exports = router
