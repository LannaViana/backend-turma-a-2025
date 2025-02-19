import express from 'express';
const router = express.Router();

import PaymentController from '../controllers/payment.controller.js';

router.post('/', PaymentController.createPayment);

export default router;