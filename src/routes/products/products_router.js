const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuth = require('../../middleware/passportJWt');
const product = require('../../controllers/products/products_controllers');

// Configure multer for image uploads
const storage = multer.memoryStorage(); // Store files in memory for processing
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const uploadimage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB file size limit
    },
});

// Routes
router.post(
    '/createproduct',
    [isAuth.isLogin],
    uploadimage.single('image'), // Expecting the file field to be named 'image'
    product.insertProduct
);

router.get('/getproducts', [isAuth.isLogin], product.getProducts);

router.get('/getproducts/:producttypeid', [isAuth.isLogin], product.getProductsByType);

//router.delete('/deleteproducts/:productid', [isAuth.isLogin], product.deleteDatabyId);

module.exports = router;
