const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/create", reportController.createReport); 

router.get("/get", reportController.getAllReport);

module.exports = router;

