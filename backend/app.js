import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoConnection from './Database/DB.js';
import ManagerRouter from './routes/mangementRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:[process.env.FRONTEND],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));


app.use('/api',ManagerRouter);
mongoConnection();
export default app;