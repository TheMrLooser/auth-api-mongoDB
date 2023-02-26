const express = require ('express')
const dotenv = require('dotenv')
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./DB/connection');
const userRouter = require('./Router/user');

dotenv.config({path:'.env'})
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin:['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
    credentials: true, 
    maxAge: 600, 
    exposedHeaders: ['*', 'Authorization' ] 
})) 


app.use('/user',userRouter)

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})