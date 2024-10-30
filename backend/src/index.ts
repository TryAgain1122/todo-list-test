import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnect } from '../config/dbConnect'
import Route from '../Routes/userRoute'

const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use('/api', Route)
app.listen(3000,() => {
    console.log('Server is running');
})