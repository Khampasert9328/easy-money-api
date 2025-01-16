const express = require('express');
const router = express.Router();
const contract  = require('../../controllers/contracts/contract_controllers');

//route
router.post('/createContract', contract.createContract);
router.get('/getContract', contract.getContract);
router.get('/contract/:contractid', contract.getContractById);
router.put('/contract/:contractid', contract.updateContract);
router.delete('/contract/:contractid', contract.DeleteContract);
module.exports = router;
