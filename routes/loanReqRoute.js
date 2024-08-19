const express = require("express");
const {
  createLoanReq,
  getAllLoanReq,
  getaLoan,
  updateLoanReqStatus,
  updateLoanReq,
  deleteLoanReq,
} = require("../controller/loanReqCtrl");

const router = express.Router();

router.post("/create", createLoanReq);
router.get("/all", getAllLoanReq);
router.post("/:id", getaLoan);
router.put("/update-status/:id", updateLoanReqStatus);
router.put("/update/:id", updateLoanReq);
router.delete("/delete/:id", deleteLoanReq);

module.exports = router;
