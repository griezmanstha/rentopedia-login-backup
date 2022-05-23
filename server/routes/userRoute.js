const express = require("express");
const {
  getAllUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/user").get(isAuthenticatedUser, getAllUsers);
router.route("/user/:id").get(isAuthenticatedUser, getUserDetails);
router.route("/user/register").post(isAuthenticatedUser, createUser);
router.route("/user/update/:id").put(isAuthenticatedUser, updateUser);
router.route("/user/delete/:id").put(isAuthenticatedUser, deleteUser);
router.route("/user/login").post(isAuthenticatedUser, loginUser);
router.route("/user/logout").post(logout);

module.exports = router;
