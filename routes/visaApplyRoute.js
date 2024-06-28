const express = require("express");
const { createVisaApply, updateVisaAppStatus, getAllVisaApply } = require("../controller/visaApplyCtrl");
const upload = require("../middleware/upload");

const router = express.Router();

router.post('/create', upload.fields([
    { name: 'passportPdf', maxCount: 1 },
    { name: 'otherDocumentPdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]), createVisaApply);
  router.get("/all",  getAllVisaApply);
  router.put("/update-status/:id",  updateVisaAppStatus);

module.exports = router;