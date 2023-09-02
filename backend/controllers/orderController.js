import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import orderRoutes from "../routes/orderRoutes.js";

// create order /api/orders POST
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// get users order /api/orders/myorders GET
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// get order by id /api/orders/:id GET
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.find(req.params.id).populate("user", "name email");

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
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
