const ProductModels = require('../../models/products/product_models');
const ProductType = require('../../models/productsType/products_type_models'); // Import ProductType model
const { uploadFile } = require('../../uploafile/uploadfile');

exports.insertProduct = async (req, res) => {
    const { product_type, productname, productdesc } = req.body;
    // console.log("body:", req.body);
    const file = req.file;
    // console.log("file:", file);
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        console.log("productTypeId:", product_type);
        
        // Validate productTypeId
        const productType = await ProductType.findById(product_type);
        if (!productType) {
            return res.status(404).json({ success: false, message: 'ບໍ່ມີໄອດີປະເພດສິນຄ້ານີ້' });
        }

        // Upload the file and get its details
        const newfile = await uploadFile(file);

        // Create a new product with the valid productTypeId
        const newProduct = new ProductModels({
            product_type: product_type,
            productname: productname,
            productdesc: productdesc,
            image: newfile.publicUrl, // Save only the publicUrl as a string
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({
            message: 'Product inserted successfully',
            data: newProduct,
        });
    } catch (error) {
        console.log("Error inserting product:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.getProducts = async (req, res) => {
    try {
        const data = await ProductModels.find().populate('product_type'); // Populate product_type details
        res.status(200).json({
            success: true,
            message: 'Get Data successfully',
            data: data,
        });
    } catch (error) {
        console.log("Error retrieving data:", error);
        res.status(500).json({ success: false, message: 'Error retrieving data' });
    }
};
exports.getProductsByType = async (req, res) => {
    console.log("params:", req.params);

    try {
        const { producttypeid } = req.params; // Correct parameter name
        console.log("productTypeId:", producttypeid);

        // Find products by product_type
        const products = await ProductModels.find({ product_type: producttypeid })
            .populate('product_type') // Populate details from ProductType
            .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'ໄອດີນີ້ບໍ່ມີຂໍ້ມູນສິນຄ້າ',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products,
        });
    } catch (error) {
        console.error('Error retrieving products by type:', error);
        res.status(500).json({ success: false, message: 'Error retrieving products by type' });
    }
};


