const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/create", feedbackController.createFeedback); 
router.get("/seller/:sellerID", feedbackController.getSellerFeedback);
router.get("/sellerRating/:sellerID", feedbackController.getSellerRating);

module.exports = router;

