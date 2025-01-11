import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import cors from "cors";

const app = express();
dotenv.config({});
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;


//api call
app.use("/api/v1/user", userRouter);  // user router

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen from ${PORT}`);
    
})
