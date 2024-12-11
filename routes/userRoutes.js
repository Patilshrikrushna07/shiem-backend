const express = require("express");
const {
  login,
  register,
  updatePassword,
  getMemberInfo,
  edit,
  remove,
  getAll
} = require("../controllers/userController");
const { protect, adminProtect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-password").post(updatePassword);
router.route("/add-team-member").post(adminProtect,register);
router.route("/get-member-info/:id").get(protect,getMemberInfo);
router.route("/update-member/:id").post(protect,edit);
router.route("/delete-member/:id").delete(adminProtect,remove);
router.route("/get-all-member").get(protect,getAll);


module.exports = router;
