import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";


// auth user POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user')
})

// register user POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
})

// logout user POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
})

// get user profile GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

// update user profile PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})

// get all user GET /api/users
//admin access
const getUsers = asyncHandler(async (req, res) => {
    res.send('admin get users')
})

// get user by id GET /api/users/:id
//admin access
const getUserById = asyncHandler(async (req, res) => {
    res.send('admin get user by id')
})

//update user PUT /api/users/:id
//admin access
const updateUser = asyncHandler(async (req, res) => {
    res.send('admin update user')
})

//delete user DELETE /api/users/:id
//admin access
const deleteUser = asyncHandler(async (req, res) => {
    res.send('admin user delete')
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}