import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decodedId = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedId.userId).select("-password");
      next();
    } catch (e) {
      res.status(401);
      throw new Error("unauthorized, failed token");
    }
  } else {
    res.status(401);
    throw new Error("unauthorized, no token");
  }
});

//admin middleware
const admin = (req, res,next)=> {
  if(req.user && req.user.isAdmin) {
    next()
  }else {
    res.status(401)
    throw new Error('no admin access')
  }
}

export {protect, admin}