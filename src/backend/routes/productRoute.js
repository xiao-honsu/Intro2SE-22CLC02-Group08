const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/create", upload.array("images", 5), productController.createProduct); 
router.get("/search", productController.searchProduct);
router.get("/", productController.getAllProductsPending);
router.get("/notpurchased", productController.getAllProductsNotPurchased);
router.get("/:id", productController.getProductById); 
router.put("/update-status/:id", productController.updateProductStatus);
router.delete("/:id", productController.deleteProduct);
router.get("/seller/:sellerId", productController.getAllProductsBySeller);
router.get('/recent/:sellerId', productController.getRecentProductsBySeller);

module.exports = router;