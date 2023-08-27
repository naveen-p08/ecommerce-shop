import express from 'express'
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 6000
import productRoutes from "./routes/productRoutes.js";
connectDB()
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

const app = express()

app.get('/', (req,res)=> {
	res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))