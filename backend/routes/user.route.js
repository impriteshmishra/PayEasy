import express from 'express';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

// in future i implement here get profile, edit profile, etc.

export default router;