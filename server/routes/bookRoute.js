const express = require("express");
const {
  getAllBooks,
  getBookDetails,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/book").get(isAuthenticatedUser, getAllBooks);
router.route("/book/:id").get(isAuthenticatedUser, getBookDetails);
router.route("/book/add").post(createBook);
router.route("/book/update/:id").put(isAuthenticatedUser, updateBook);
router.route("/book/delete/:id").put(isAuthenticatedUser, deleteBook);

module.exports = router;
