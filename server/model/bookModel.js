const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bookSchema = new mongoose.Schema({
  name: {
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
    default: 0,
    required: [true, "Please enter rating of book"],
  },
  images: [
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
  category: {
    type: String,
    required: [true, "Please enter genre of book"],
  },
  numofReviews: {
    type: Number,
    default: 0,
    required: [true, "Please enter review number of book"],
  },
  // reviews:[
  //   {
  //     name:{
  //       type: String,
  //       required:[true,"Enter name of reviwer"],

  //     },
  //     rating:{
  //       type: Number,
  //       required:true,
  //     },
  //     comment:{
  //       type:String,
  //       required:true,
  //     }
  //   }
  // ],
  date_published: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter date published of book"],
  },
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
