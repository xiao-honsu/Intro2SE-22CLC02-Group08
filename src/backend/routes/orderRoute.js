const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


router.post("/create", orderController.createOrder);
router.put("/update-status/:orderId", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);
router.get("/buyer/:buyerId", orderController.getAllOrdersByBuyer);

module.exports = router;
