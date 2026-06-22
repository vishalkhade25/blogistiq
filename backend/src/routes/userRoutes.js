import express from 'express';
import { SignUpUser, loginUser,getProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signup',SignUpUser);
userRouter.post('/login',loginUser);
userRouter.get('/profile',auth,getProfile)
// userRouter.get('/test', auth, (req,res)=>{
//     res.json({
//         user:req.user
//     });
// });

export default userRouter;