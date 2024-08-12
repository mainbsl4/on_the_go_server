const express = require("express");
const { createDeposit, getAllDeposit, getaDeposit, updateDepositReqStatus, updateDeposit, deleteDeposit } = require("../controller/depositCtrl");
const router = express.Router();

router.post("/create", createDeposit );
router.get("/all",  getAllDeposit);
router.post("/:id",  getaDeposit);
router.put("/update-status/:id",  updateDepositReqStatus);
router.put("/update/:id",  updateDeposit);
router.delete("/delete/:id",  deleteDeposit);

module.exports = router;