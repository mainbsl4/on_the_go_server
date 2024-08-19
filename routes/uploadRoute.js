const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");
const router = express.Router();

router.post(
  "/pass-image",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);
router.post(
  "/doc-image",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);

router.post(
  "/img",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);
router.post(
  "/delivered-visa-pdf",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);
router.post(
  "/previous-visa-img",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);

router.post(
  "/deposit-img",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);
router.post(
  "/application-img",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);
router.post(
  "/payment-img",
  productImgResize,
  uploadPhoto.array("images", 10),
  uploadImages
);

router.delete("/delete-img/:id", deleteImages);

module.exports = router;
