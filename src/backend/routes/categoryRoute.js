const express = require("express");
const router = express.Router();
const Category = require("../models/CategoryModel");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch categories." });
  }
});

module.exports = router;
