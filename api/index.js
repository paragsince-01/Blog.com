import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDB :  Connected');
}).catch((err)=>{
    console.log(err);
});
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
        console.log('Server port : 3000');
    }
);

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment',commentRoute);

app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        succes: false,
        statusCode,
        message,
    })
});

