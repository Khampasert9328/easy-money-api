const express = require('express');
const router = express.Router();

//passportJWT
const isAuth = require('../../middleware/passportJWt')
const contract  = require('../../controllers/contracts/contract_controllers');

//route
router.post('/createContract',[isAuth.isLogin], contract.createContract);
router.get('/getContract',[isAuth.isLogin], contract.getContract);
router.get('/contract/:contractid',[isAuth.isLogin], contract.getContractById);
router.put('/contract/:contractid',[isAuth.isLogin], contract.updateContract);
router.delete('/contract/:contractid',[isAuth.isLogin], contract.DeleteContract);
module.exports = router;
