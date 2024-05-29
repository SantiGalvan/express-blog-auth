const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

router.use(express.urlencoded({ extended: true }));

router.post("/", authController.login);

module.exports = router;