import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// fetch all products /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// fetch specific product by id /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//ADMIN
// add new product /api/products POST
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// admin
// update a product /api/products/:id PUT
const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, countInStock} =
    req.body;
  const product = await Product.findById(req.params.id)
  
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }else {
    res.status(404)
    throw new Error("Product not found")
  }
});

export {getProducts, getProductById, createProduct, updateProduct};