import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

await connectDB();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
})