import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config({});
app.use(cors());
app.use(express.json());
const app = express();
const PORT = process.env.PORT || 3000;


//api call
app.use("/api/v1/user", userRouter);  // user router

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen from ${PORT}`);
    
})
