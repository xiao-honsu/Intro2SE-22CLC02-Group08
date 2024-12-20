const CartModel = require('../models/CartModel');
const CartDetailModel = require('../models/CartDetailModel');
const ProductModel = require('../models/ProductModel');

const cartController = {
    addToCart: async (req, res) => {
        const { buyerID, productID } = req.body;
    
        if (!buyerID || !productID) {
            return res.status(400).json({ success: false, message: "Buyer ID and Product ID are required." });
        }
    
        try {
            let cart = await CartModel.findOne({ buyerID });
    
            if (!cart) {
                cart = new CartModel({ buyerID, totalAmount: 0 });
                await cart.save(); 
            }
    
            const existingCartDetail = await CartDetailModel.findOne({ cartID: cart._id, productID });
            if (existingCartDetail) {
                return res.status(400).json({ success: false, message: "Product already in cart." });
            }
    
            const newCartDetail = new CartDetailModel({ cartID: cart._id, productID });
            await newCartDetail.save();
    
            const product = await ProductModel.findById(productID);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }
            cart.totalAmount += product.price;
    
            await cart.save();
    
            res.status(200).json({ success: true, message: "Product added to cart.", cart });
        } catch (error) {
            console.error("Error during adding to cart:", error);
            res.status(500).json({ success: false, message: "Failed to add product to cart." });
        }
    },
    

    removeFromCart: async (req, res) => {
        const { buyerID, productID } = req.body;

        if (!buyerID || !productID) {
            return res.status(400).json({ success: false, message: "Buyer ID and Product ID are required." });
        }

        try {
            const cart = await CartModel.findOne({ buyerID });
            if (!cart) {
                return res.status(404).json({ success: false, message: "Cart not found." });
            }

            const cartDetail = await CartDetailModel.findOneAndDelete({ cartID: cart._id, productID });
            if (!cartDetail) {
                return res.status(404).json({ success: false, message: "Product not found in cart." });
            }

            const product = await ProductModel.findById(productID);
            cart.totalAmount -= product.price;
            await cart.save();

            res.status(200).json({ success: true, message: "Product removed from cart.", cart });
        } catch (error) {
            console.error("Error removing from cart:", error);
            res.status(500).json({ success: false, message: "Failed to remove product from cart." });
        }
    },

    getCart: async (req, res) => {
        const { buyerID } = req.params;

        if (!buyerID) {
            return res.status(400).json({ success: false, message: "Buyer ID is required." });
        }

        try {
            let cart = await CartModel.findOne({buyerID});
            if (!cart) {
                cart = new CartModel({buyerID, totalAmount: 0});
                await cart.save();
            }

            const cartDetails = await CartDetailModel.find({ cartID: cart._id });
            if (!cartDetails.length) {
                return res.status(200).json({ success: true, cart, products: [] }); 
            }
            const productIDs = cartDetails.map((detail) => detail.productID);
            const products = await ProductModel.find({ _id: { $in: productIDs } })
                                               .select('productName price description images')
                                               .populate('sellerID', 'username avatar');

            res.status(200).json({ success: true, cart, products });
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({ success: false, message: "Failed to fetch cart." });
        }
    },
};

module.exports = cartController;