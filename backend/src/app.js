import express from 'express';
import cors from 'cors';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use('/blogs', blogRouter);
app.use('/accounts',userRouter);

app.get('/',(req,res)=>{
    res.send("Backend server is running");
})

export default app;