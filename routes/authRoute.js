const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
  loginUser,
  isUserApproved,
} = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/userApprove/:id", isUserApproved);
router.get("/allUsers", getUsers);
router.post("/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
