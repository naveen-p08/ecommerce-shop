import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

// auth user POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmins,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// register user POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else {
    res.status(400)
    throw new Error('invalid user data')
  }
});

// logout user POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out" });
});

// get user profile GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else {
    res.status(404)
    throw new Error('user not found')
  }
});

// update user profile PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()
      res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin: updatedUser.isAdmin
      })
    }else {
      res.status(404)
      throw new Error('user not found')
    }
});

// get all user GET /api/users
//admin access
const getUsers = asyncHandler(async (req, res) => {
  res.send("admin get users");
});

// get user by id GET /api/users/:id
//admin access
const getUserById = asyncHandler(async (req, res) => {
  res.send("admin get user by id");
});

//update user PUT /api/users/:id
//admin access
const updateUser = asyncHandler(async (req, res) => {
  res.send("admin update user");
});

//delete user DELETE /api/users/:id
//admin access
const deleteUser = asyncHandler(async (req, res) => {
  res.send("admin user delete");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};