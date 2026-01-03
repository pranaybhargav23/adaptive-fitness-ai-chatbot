import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.routes.js';
import { connectDB } from './config/db.js';
import job from './utils/cron.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

job.start(); // Start the cron job
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes); 


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
)
