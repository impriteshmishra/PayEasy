import express from 'express';
import {loginValidator, signupValidator, updateProfileValidator} from "../validators/validatorSchema.js";
import {validate} from '../middleware/validator.js';
import { register, login, logout, updateProfile, filterUser } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();



router.route('/register').post(validate(signupValidator), register);
router.route('/login').post(validate(loginValidator),login);
router.route('/logout').get(logout);
router.route('/updateProfile').put(isAuthenticated, validate(updateProfileValidator), updateProfile);
router.route('/searchUser').get(filterUser);


// in future i implement here get profile, edit profile, etc.

export default router;