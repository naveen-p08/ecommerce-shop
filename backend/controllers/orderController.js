import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// create order /api/orders POST
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

// get users order /api/orders/myorders GET
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders");
});

// get order by id /api/orders/:id GET
const getOrderById = asyncHandler(async (req, res) => {
  res.send("get order by id");
});

// update order payment /api/orders/:id/pay PUT
const updateOrderToPay = asyncHandler(async (req, res) => {
  res.send("update order to pay");
});

// update order delivery /api/orders/:id/deliver GET
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  res.send("update order to deliver");
});

// Admin
// get all orders /api/orders/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("admin get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPay,
  updateOrderToDeliver,
  getOrders,
};
