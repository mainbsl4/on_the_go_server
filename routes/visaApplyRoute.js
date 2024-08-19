const express = require("express");
const {
  createVisaApply,
  updateVisaAppStatus,
  getAllVisaApply,
  deleteVisaApp,
  updateVisaApply,
  getaVisaApply,
} = require("../controller/visaApplyCtrl");

const router = express.Router();

router.post("/create", createVisaApply);
router.get("/all", getAllVisaApply);
router.post("/:id", getaVisaApply);
router.put("/update-status/:id", updateVisaAppStatus);
router.put("/update/:id", updateVisaApply);
router.delete("/delete/:id", deleteVisaApp);

module.exports = router;
