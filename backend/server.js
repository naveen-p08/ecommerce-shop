import express from 'express'
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 6000
import cookieParser from 'cookie-parser'
import productRoutes from "./routes/productRoutes.js";
connectDB()
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req,res)=> {
	res.send('Api is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req,res)=> res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))