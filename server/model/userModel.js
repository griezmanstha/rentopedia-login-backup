const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your full name"],
    maxLength: [15, "Your full name must not exceed 15 characters"],
    minLength: [3, "Your full name must at least be 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "Please enter a password"],
    minLength: [8, "The password must be greater than 8 characters"],
    select: false,
  },
  // avatar: [
  //     {
  //     public_id: {
  //         type: String,
  //         required: true,
  //     },
  //     url: {
  //         type: String,
  //         required: true,
  //     },
  // },
  // ],
  // role: {
  //     type: String,
  //     default: "user",
  // }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const user = mongoose.model("User", userSchema);

module.exports = user;
