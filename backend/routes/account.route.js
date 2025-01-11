import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { getBalance, transferAmount } from '../controllers/account.controller';


const router = express.Router();

router.route('/balance').get(isAuthenticated, getBalance);
router.route('/transfer').get(isAuthenticated, transferAmount);