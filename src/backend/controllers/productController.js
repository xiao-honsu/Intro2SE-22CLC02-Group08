const ProductModel = require('../models/ProductModel');

const productController = {
    createProduct: async (req, res) => {
        try {
            const { productName, description, price, address, categoryIDs, sellerID } = req.body;

            if (!productName || !price) {
                return res.status(400).json({ success: false, message: "Product name, price are required." });
            }

            const images = req.files.map((file) => {
                return `data:image/png;base64,${file.buffer.toString("base64")}`;
            });

            if (images.length > 5) {
                return res.status(400).json({ success: false, message: "You can upload up to 5 images only." });
            }

            const newProduct = new ProductModel({
                productName,
                description,
                price,
                address,
                categoryIDs: JSON.parse(categoryIDs),
                sellerID,
                images,
                status: "Pending Approval" 
            });

            await newProduct.save();
            return res.status(201).json({ success: true, message: "Product uploaded successfully, awaiting admin approval.", product: newProduct });
        } catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ success: false, message: "Failed to create product." });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.find().populate('categoryID', 'categoryName').populate('sellerID', 'username');
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch products." });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id).populate('categoryID', 'categoryName').populate('sellerID', 'username');
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }
            return res.status(200).json({ success: true, product });
        } catch (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch product." });
        }
    },


    updateProductStatus: async (req, res) => {
        try {
            const { status } = req.body; 
            const allowedStatus = ["Pending Approval", "Not Purchased", "Shipping", "Purchased"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ success: false, message: "Invalid status value." });
            }

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }

            return res.status(200).json({ success: true, message: "Product status updated successfully.", product: updatedProduct });
        } catch (error) {
            console.error("Error updating product status:", error);
            return res.status(500).json({ success: false, message: "Failed to update product status." });
        }
    },


    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

            if (!deletedProduct) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }

            return res.status(200).json({ success: true, message: "Product deleted successfully." });
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ success: false, message: "Failed to delete product." });
        }
    }
};

module.exports = productController;
