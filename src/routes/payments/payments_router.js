const express = require('express');
const router = express.Router();

//passportJWT
const isAuth = require('../../middleware/passportJWt')
const payments  = require('../../controllers/payment/payments_controllers');

//route
router.post('/createPayments',[isAuth.isLogin], payments.createPayment);
router.get('/getPayments',[isAuth.isLogin], payments.getPayment);
router.get('/payments/:paymentsid',[isAuth.isLogin], payments.getPaymentById);
router.put('/payments/:paymentsid',[isAuth.isLogin], payments.updatePayment);
router.delete('/payments/:paymentsid',[isAuth.isLogin], payments.removePayment);
module.exports = router;
