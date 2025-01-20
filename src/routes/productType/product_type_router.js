const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/passportJWt');
const product = require('../../controllers/productType/product_type_controllers');


router.post('/createproductType', [isAuth.isLogin], product.insertProductType);
router.get('/getproductTypes', [isAuth.isLogin], product.getProductType);
router.get('/getproductTypes/:producttypeid', [isAuth.isLogin], product.getProductTypeById);
router.put('/updateproductTypes/:producttypeid', [isAuth.isLogin], product.updateProductType);
router.delete('/deleteproductTypes/:producttypeid', [isAuth.isLogin], product.deleteProductType);

module.exports = router;