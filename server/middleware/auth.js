const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = async(req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Please Login to access this resource",
          });
    }

    const decodedDate = jwt.verify(token,process.env.JWT_SECRET);

    await User.findById(decodedData.id);

    next();
};

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new ErrorHander(
//             `Role: ${req.user.role} is not allowed to access this resouce `,
//             403
//           )
//         );
//       }
  
//       next();
//     };
//   };