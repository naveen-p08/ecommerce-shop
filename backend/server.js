import express from 'express'
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 6000
import products from "./data/products.js";

connectDB()
const app = express()

app.get('/', (req,res)=> {
	res.send('Api is running')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res)=> {
	const product = products.find(product => product._id === req.params.id)
	res.json(product)
})

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))