const express = require("express");
const { createBankDetails, deleteBankDetails, updateBankDetails, getAllBankDetails, getaBankDetails } = require("../controller/bankDetailsCtrl");
const router = express.Router();

router.post("/create", createBankDetails );
router.get("/allBankDetails",  getAllBankDetails);
router.post("/:id",  getaBankDetails);
router.put("/update/:id",  updateBankDetails);
router.delete("/delete/:id", deleteBankDetails);

module.exports = router;