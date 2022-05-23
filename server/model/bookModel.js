const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: [true, "Please enter the bookname"],
  },
  description: {
    type: String,
    required: [true, "Please enter the book's description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of book"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter rating of book"],
  },
  genre: {
    type: String,
    required: [true, "Please enter genre of book"],
  },
  reviews_number: {
    type: Number,
    required: [true, "Please enter review number of book"],
  },
  date_published: {
    type: Date,
    required: [true, "Please ente date published of book"],
  },
  cover: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

//JWT
bookSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password

const book = mongoose.model("Book", bookSchema);

module.exports = book;
