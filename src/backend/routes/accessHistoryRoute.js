const express = require("express");
const router = express.Router();
const accessHistoryController = require("../controllers/accessHistoryController");


router.post("/:create", accessHistoryController.addHistory);
module.exports = router;
