const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const compression = require('compression')
require('dotenv').config()
app.use(compression())
const connectDB = require('./config/db')
const port = process.env.PORT
//config db
connectDB()
app.use(express.json())
app.use(cors())


const routes = require('./routes/user')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')
const eventRoutes = require("./routes/events")

app.get('/',(req,res)=>{
    res.send('server run nicely')
})
//routes
app.use('/api/v1/auth',routes)
app.use('/api/v2/event',eventRoutes)
app.use('/api/v2/order',orderRoutes)
app.use('/api/v2/product',productRoutes)
app.use('/',express.static(path.join(__dirname,"uploads")))
app.listen(port,()=>console.log(`server listening on port ${port} `))