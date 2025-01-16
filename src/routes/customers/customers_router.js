const express = require('express');
const router = express.Router();

//passportJWT
const isAuth = require('../../middleware/passportJWt')
const customer  = require('../../controllers/customers/customers_controllers');

//route
router.post('/createcustomers',[isAuth.isLogin], customer.createCustomers);
router.get('/getcustomers',[isAuth.isLogin], customer.getCustomers);
router.get('/customers/:customerid',[isAuth.isLogin], customer.getCustomersById);
router.put('/customers/:customerid',[isAuth.isLogin], customer.updateCustomers);
router.delete('/customers/:customerid',[isAuth.isLogin], customer.DeleteCustomers);
module.exports = router;
