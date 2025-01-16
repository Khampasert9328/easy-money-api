const express = require('express');
const router = express.Router();
const customer  = require('../../controllers/customers/customers_controllers');

//route
router.post('/createcustomers', customer.createCustomers);
router.get('/getcustomers', customer.getCustomers);
router.get('/customers/:customerid', customer.getCustomersById);
router.put('/customers/:customerid', customer.updateCustomers);
router.delete('/customers/:customerid', customer.DeleteCustomers);
module.exports = router;
