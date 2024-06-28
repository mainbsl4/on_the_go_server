const express = require("express");
const { createLoanReq, getAllLoanReq } = require("../controller/loanReqCtrl");

const router = express.Router();

router.post("/create", createLoanReq );
router.get("/all",  getAllLoanReq);

module.exports = router;