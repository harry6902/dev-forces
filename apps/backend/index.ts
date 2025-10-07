
import express from 'express';
import userRouter from './routes/user';
import adminRouter from './routes/admin';
import contestRouter from './routes/contest';
import cors from 'cors'
import { adminmiddleware } from './middlewares/admin';
import contestCreateRouter   from './routes/contestCreation'




const app=express();

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/contest",contestRouter);
app.use("/createcontest",adminmiddleware,contestCreateRouter);


app.listen(process.env.PORT || 4000);