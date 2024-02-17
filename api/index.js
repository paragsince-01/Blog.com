import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDB is Connected');
}).catch((err)=>{
    console.log(err);
});
const app = express();
app.use(express.json());
app.use(cookieParser());
// const cors = require('cors');  Configure CORS to allow requests from http://localhost:5173
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with the actual URL of your frontend
// };

// app.use(cors(corsOptions));

app.listen(3000, ()=>{
        console.log('server is runing on port 3000');
    }
);

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        succes: false,
        statusCode,
        message,
    })
});

