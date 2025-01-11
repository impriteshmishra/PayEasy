import express from 'express';
import {validator} from "../validators/validator.js";
import {validate} from '../middleware/validator.js';
import { register, login, logout } from '../controllers/user.controller.js';
const router = express.Router();



router.route('/register').post(validate(validator), register);
router.route('/login').post(login);
router.route('/logout').get(logout);

// in future i implement here get profile, edit profile, etc.

export default router;