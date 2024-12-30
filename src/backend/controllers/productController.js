const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");
const NotificationModel = require("../models/NotificationModel");
const AdminNotificationModel = require("../models/AdminNotificationModel");
const UserModel = require('../models/UserModel');
const AdminModel = require('../models/AdminModel');

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
                status: "Pending Approval",
                statusUpdatedAt: Date.now()
            });

            await newProduct.save();

            const admins = await AdminModel.find(); 
            const notifications = admins.map(admin => ({
                receiverID: admin._id,
                content: `New product "${productName}" has been posted and is awaiting approval.`,
                role: "admin",
            }));

        await AdminNotificationModel.insertMany(notifications);
            return res.status(201).json({ success: true, message: "Product uploaded successfully, awaiting admin approval.", product: newProduct });
        } catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ success: false, message: "Failed to create product." });
        }
    },

    getAllProductsPending: async (req, res) => {
        try {
            const products = await ProductModel.find({ status: 'Pending Approval' }).populate('categoryIDs', 'categoryName').populate('sellerID', 'username avatar');
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch products." });
        }
    },

    getAllProductsNotPurchased: async (req, res) => {
        try {
            const products = await ProductModel.find({ status: 'Not Purchased' }).sort({ statusUpdatedAt: -1 });
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch products." });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
    
        if (!id || id.length !== 24) {
            return res.status(400).json({ success: false, message: "Invalid or missing product ID." });
        }
    
        try {
            const product = await ProductModel.findById(id).sort({ statusUpdatedAt: -1 })
                .populate('categoryIDs', 'categoryName')
                .populate('sellerID', 'username avatar bank bankAccount');
    
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }
    
            return res.status(200).json({ success: true, product });
        } catch (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch product." });
        }
    },
    

    getAllProductsBySeller: async (req, res) => {
        try {
            const { sellerId } = req.params; 
            if (!sellerId) {
                return res.status(400).json({ success: false, message: "Seller not found." });
            }
    
            const products = await ProductModel.find({ sellerID: sellerId }).populate('categoryIDs', 'categoryName').populate('sellerID', 'username'); 
    
            if (!products || products.length === 0) {
                return res.status(404).json({ success: false, message: "No products found for seller." });
            }
    
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching products by seller:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch products by seller." });
        }
    },
    
    updateProductStatus: async (req, res) => {
        try {      
            const { status } = req.body.status; 
            const allowedStatus = ["Pending Approval", "Not Purchased", "To Confirm", "Shipping", "Purchased"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ success: false, message: "Invalid status value." });
            }

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                req.params.id,
                { status, statusUpdatedAt: Date.now() },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }

            const order = await OrderModel.findOne({ productID: req.params.id });

            if (status === "Not Purchased") {
                const notificationContent = `Your product "${updatedProduct.productName}" has been approved.`;
                await NotificationModel.create({
                    receiverID: updatedProduct.sellerID, 
                    content: notificationContent,
                    role: "seller",
                });
            }

            if (status === "Shipping") {
                await OrderModel.findByIdAndUpdate(order._id, { status: "Shipping" });
                const notificationContent = `Your order for product "${updatedProduct.productName}" is now shipping.`;
                await NotificationModel.create({
                    receiverID: order.buyerID, 
                    content: notificationContent,
                    role: "buyer",
                });
            }

            if (status === "Purchased") {
                await OrderModel.findByIdAndUpdate(order._id, { status: "Received" });
                
                const seller = await UserModel.findById(updatedProduct.sellerID);
                if (seller) {
                    await UserModel.findByIdAndUpdate(
                        updatedProduct.sellerID,
                        { $inc: { totalSoldProducts: 1 } } 
                    );
                }
                
                const sellerNotification = `Your product "${updatedProduct.productName}" has been successfully delivered to the buyer.`;
                await NotificationModel.create({
                    receiverID: updatedProduct.sellerID,
                    content: sellerNotification,
                    role: "seller",
                });

                const buyerNotification = `Your order #${order._id} for "${updatedProduct.productName}" has been successfully delivered.`;
                await NotificationModel.create({
                    receiverID: order.buyerID,
                    content: buyerNotification,
                    role: "buyer",
                });
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
            const notificationContent = `Your product "${updatedProduct.productName}" has been deleted.`;
            await NotificationModel.create({
                receiverID: updatedProduct.sellerID, 
                content: notificationContent,
                role: "seller",
            });

            return res.status(200).json({ success: true, message: "Product deleted successfully." });
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ success: false, message: "Failed to delete product." });
        }
    },

    searchProduct: async (req, res) => {
        try {
            const { keyword } = req.query;
    
            if (!keyword || keyword.trim() === "") {
                return res.status(400).json({ success: false, message: "Keyword is required for search." });
            }
            const regex = new RegExp(keyword, 'i');
    
            const products = await ProductModel.find({
                $and: [
                    { status: "Not Purchased" },
                    {
                        $or: [
                            { productName: regex },
                            { categoryIDs: { $elemMatch: { categoryName: regex } } }
                        ]
                    }
                ]
            }).populate("categoryIDs", "categoryName")
              .populate("sellerID", "username avatar");
    
            res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error searching products:", error);
            res.status(500).json({ success: false, message: "Failed to search products" });
        }
    },
    
    getRecentProductsBySeller: async (req, res) => {
        try {
            const { sellerId } = req.params; 
            const limit = parseInt(req.query.limit) || 2; 
    
            if (!sellerId || sellerId.length !== 24) {
                return res.status(400).json({ success: false, message: "Invalid or missing seller ID." });
            }
    
            const products = await ProductModel.find({ sellerID: sellerId, status: 'Not Purchased'  }).sort({ statusUpdatedAt: -1 })
                .sort({ createdAt: -1 }) 
                .limit(limit) 
                .populate("categoryIDs", "categoryName") 
                .populate("sellerID", "username avatar");
    
            if (products.length === 0) {
                return res.status(404).json({ success: false, message: "No recent products found for this seller." });
            }
    
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching recent products by seller:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch recent products by seller." });
        }
    },
    
    getProductsUpdatedToday: async (req, res) => {
        try {

            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
    
            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);
            const products = await ProductModel.find({
                statusUpdatedAt: { $gte: startOfToday, $lt: endOfToday },
            })
                .populate('sellerID', 'username email avatar totalSoldProducts') 
                .exec();
    
            res.json({ success: true, products });
        } catch (error) {
            console.error('Error fetching products updated today:', error);
            res.json({ success: false, message: 'Failed to fetch products' });
        }
    },
    
};

module.exports = productController;
