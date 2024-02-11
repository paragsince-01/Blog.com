import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDB is Connected');
}).catch((err)=>{
    console.log(err);
});
const app = express();
app.use(express.json());

app.listen(
    3000, ()=>{
        console.log('server is runing on port 3000');
    }
);

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);