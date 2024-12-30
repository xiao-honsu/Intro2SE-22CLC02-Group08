const express = require("express");
const router = express.Router();
const supportController = require("../controllers/supportController");

router.post("/find-admin", supportController.findAdminForUser);

module.exports = router;
