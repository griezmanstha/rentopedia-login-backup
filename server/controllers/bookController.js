const Book = require("../model/bookModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

//Create Books
exports.createBook = async (req, res, next) => {
  const book = await Book.create(req.body);

  const token = book.getJWTToken();
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    token,
  });
};

//Get Book
exports.getAllBooks = async (req, res) => {
  const apiFeature = new ApiFeatures(Book.find(), req.query).search().filter();
  const books = await apiFeature.query;

  res.status(201).json({
    success: true,
    books,
  });
};

//Get Book Details
exports.getBookDetails = async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Book found",
    book,
  });
};

//Update Book
exports.updateBook = async (req, res) => {
  const book = Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book not found",
    });
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Book Updated Successfully",
    book,
  });
};

//Book delete
exports.deleteBook = async (req, res) => {
  let book = Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book not found",
    });
  }

  book = await Book.findByIdAndRemove(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    book,
  });
};
