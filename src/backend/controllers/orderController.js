const OrderModel = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const CartModel = require('../models/CartModel');
const CartDetailModel = require('../models/CartDetailModel');

const orderController = {
    createOrder: async (req, res) => {
        const { productID, buyerID, receiverName, receiverPhoneNumber, receiverEmail, address, paymentMethod, bank, bankAccount } = req.body;
        if (!productID || !buyerID || !receiverName || !receiverPhoneNumber || !receiverEmail || !address || !paymentMethod) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        try {
            const existingOrder = await OrderModel.findOne({ productID, buyerID, status: { $ne: "Cancelled" } });
            if (existingOrder) {
                return res.status(400).json({ success: false, message: "This product has already been purchased" });
            }

            const newOrder = new OrderModel({
                productID,
                buyerID,
                receiverName,
                receiverPhoneNumber,
                receiverEmail,
                address,
                paymentMethod,
                bank,
                bankAccount,
                orderDate: Date.now(),
                status: "Confirming"
            });

            await newOrder.save();

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productID,
                { status: "To Confirm" },
                { new: true }
            );

            if (!updatedProduct) {
                console.error("Failed to update product status. Product not found.");
                return res.status(404).json({ success: false, message: "Product not found for updating status." });
            }

            const deletedCartDetail = await CartDetailModel.findOneAndDelete({ productID });
            if (!deletedCartDetail) {
                console.warn("Product not found in cart. It might have been removed already.");
            }

            const product = await ProductModel.findById(productID);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found." });
            }

            const cart = await CartModel.findOne({ buyerID });
            if (cart) {
                cart.totalAmount = Math.max(0, cart.totalAmount - product.price); // Đảm bảo totalAmount không âm
                await cart.save();
            } else {
                console.warn("Cart not found for the buyer.");
            }

            return res.status(201).json({ success: true, message: "Order created successfully.", order: newOrder });
        } catch (error) {
            console.error("Error creating order: ", error);
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
    },

    getAllOrdersByBuyer: async (req, res) => {
        try {
            const { buyerId } = req.params; 
            if (!buyerId) {
                return res.status(400).json({ success: false, message: "Buyer not found." });
            }
            const orders = await OrderModel.find({ buyerID: buyerId })
                                            .populate('productID', 'productName price sellerID images');
                                            
            if (!orders || orders.length === 0) {
                return res.status(200).json({ success: true, message: "No orders found for buyer", orders: [] });
            }
            return res.status(200).json({ success: true, orders });
        } catch (error) {
            console.error("Error fetching orders by buyer:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch orders by buyer" });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {              
            const { status } = req.body; 
            const allowedStatus = ["Confirming", "Shipping", "Received", "Cancelled"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ success: false, message: "Invalid status value." });
            }
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                req.params.orderId,
                { status },
                { new: true }
            );
    
            if (!updatedOrder) {
                return res.status(404).json({ success: false, message: "Order not found." });
            }
            
            if (status === "Cancelled") {
                const updatedProduct = await ProductModel.findByIdAndUpdate(
                    updatedOrder.productID,
                    { status: "Not Purchased" },
                    { new: true }
                );
            }
            return res.status(200).json({ success: true, message: "Order status updated successfully.", order: updatedOrder });
        } catch (error) {
            console.error("Error updating order status:", error);
            return res.status(500).json({ success: false, message: "Failed to update order status." });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    
            if (!deletedOrder) {
                return res.status(404).json({ success: false, message: "Order not found." });
            }
    
            return res.status(200).json({ success: true, message: "Order deleted successfully." });
        } catch (error) {
            console.error("Error deleting order:", error);
            return res.status(500).json({ success: false, message: "Failed to delete order" });
        }
    },

};

module.exports = orderController;