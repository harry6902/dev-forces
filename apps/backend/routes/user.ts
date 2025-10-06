

import Router, { request } from 'express';
import { SignUpBody } from '../types';
import {client} from 'db/client'
import { email } from 'zod';
import { Role } from '../../../packages/db/generated/prisma';
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { sendEmail } from '../sendEmail';




const r= Router();

r.post("/signup",async (req,res)=>{

    const {success,data} = SignUpBody.safeParse(req.body);

    if(!success){
        res
        .status(411)
        .json({
            message:"Schema validation failed"
        })
        return;
    }


    const user= await client.user.upsert({
        create:{
            email:data.email,
            role: "User"
        },
        update:{},
        where:{
            email: data.email
        }

    })

    const token= jwt.sign({
        userId : user.id
    },process.env.EMAIL_JWT_PASSWORD!)

    if(process.env.NODE_ENV=="production"){
        await sendEmail(data.email,`Login to contest platform`, ` Click on the link to login https://contest.com/user/signin/post/?token=${token}`)
    }
    else{
        console.log(` Click on the link to login http://localhost:4000/user/signin/post/?token=${token}`)
    }

    res.json({
        message :"We have emailed one time login link to you. Please check your email"
    })

})


r.get("/signin/post",(req,res)=>{
    try {
    
        const tokens=req.query.token as string;
        console.log(tokens);
        const decoded= jwt.verify(tokens,process.env.EMAIL_JWT_PASSWORD!) as JwtPayload;

     

        if(decoded.userId){
            const token=jwt.sign({
                userid: decoded.userId
            }, process.env.USER_JWT_PASSWORD!);

            res.json({
                tokens
            })
        }
        else{
            res
            .status(411)
            .json({
                message:"Invalid Credentials"
            })
            return;
        }
        
    } catch (error) {
        res
        .status(411)
        .json({
            message:"Invalid Credentials"
        })
        return;
    }
})




export default r;