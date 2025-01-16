const express = require('express');
const router = express.Router();
const payments  = require('../../controllers/payment/payments_controllers');

//route
router.post('/createPayments', payments.createPayment);
router.get('/getPayments', payments.getPayment);
router.get('/payments/:paymentsid', payments.getPaymentById);
router.put('/payments/:paymentsid', payments.updatePayment);
router.delete('/payments/:paymentsid', payments.removePayment);
module.exports = router;
