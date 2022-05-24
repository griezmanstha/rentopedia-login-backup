const User = require("../model/userModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

//Create User
exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    message: "User created successfully",
    token,
  });
};

//Get User
exports.getAllUsers = async (req, res) => {
  const apiFeature = new ApiFeatures(User.find(), req.query).search().filter();
  const users = await apiFeature.query;

  res.status(201).json({
    success: true,
    users,
  });
};

//Get User Details
exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User found",
    user,
  });
};

//Update User
exports.updateUser = async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    user,
  });
};

//User delete
exports.deleteUser = async (req, res) => {
  let user = User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user = await User.findByIdAndRemove(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
};

//Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Email or Password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
};

//LogOut
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
    token,
  });
};
