const ProductTypeModels = require('../../models/productsType/products_type_models');
exports.insertProductType = async (req, res) => {
    try {
        const { product_type } = req.body;
        const newProductType = new ProductTypeModels({
            product_type,
        });
        const savedProductType = await newProductType.save();
        res.status(201).json({
            message: 'Product Type inserted successfully',
            data: savedProductType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
exports.getProductType = async (req, res) => {
    try {
        const data = await ProductTypeModels.find();
        res.status(200).json({
            success: true,
            message: 'Get Data successfully',
            data: data,
        });
    } catch (error) {
        console.log("Error retrieving data:", error);
        res.status(500).json({ success: false, message: 'Error retrieving data' });
    }
}
exports.getProductTypeById = async (req, res) => {
    try {
        const { producttypeid } = req.params;
        const data = await ProductTypeModels.findById(producttypeid);
        res.status(200).json({
            success: true,
            message: 'Get Data successfully',
            data: data,
        });
    } catch (error) {
        console.log("Error retrieving data:", error);
        res.status(500).json({ success: false, message: 'Error retrieving data' });
    }
}

exports.updateProductType = async (req, res) => {
    try {
        const { producttypeid } = req.params;
        const { product_type } = req.body;
        const updatedProductType = await ProductTypeModels.findByIdAndUpdate(producttypeid, { product_type }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Update Data successfully',
            data: updatedProductType,
        });
    } catch (error) {
        console.log("Error updating data:", error);
        res.status(500).json({ success: false, message: 'Error updating data' });
    }
}

exports.deleteProductType = async (req, res) => {
    try {
        const { producttypeid } = req.params;
        await ProductTypeModels.findByIdAndDelete(producttypeid);
        res.status(200).json({
            success: true,
            message: 'Delete Data successfully',
        });
    } catch (error) {
        console.log("Error deleting data:", error);
        res.status(500).json({ success: false, message: 'Error deleting data' });
    }
}