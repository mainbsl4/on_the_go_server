const express = require("express");
const { createDeposit, getAllDeposit } = require("../controller/depositCtrl");

const router = express.Router();

router.post("/create", createDeposit );
router.get("/all",  getAllDeposit);

module.exports = router;