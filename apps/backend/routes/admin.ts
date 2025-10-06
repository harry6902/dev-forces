import { Router } from "express";
import { SignUpBody } from "../types";
import { client } from "db/client";
import jwt, { type JwtPayload } from 'jsonwebtoken'

const r=Router();


r.post("/signup", async (req,res)=>{

    const {success,data}= SignUpBody.safeParse(req.body);


    if(!success){
        res.status(411).json({
            message:"Input validation failed"
        })
        return;
    }


    if(data.email!=="manepallihari2002@gmail.com"){
        res
        .status(400)
        .json({
            message:"User doesn't have admin access"
        })
        return;
    }


    const admin=await client.user.upsert({
       create:{
        email: data?.email,
        role:"Admin"
       },
       update:{},
       where:{
        email:data.email
       }
    } );

    const token=jwt.sign({
        userId: admin.id
    },process.env.EMAIL_JWT_PASSWORD!)


    console.log(`Please click on the link for signup http://localhost:4000/admin/post/signin?token=${token}`)

    res
    .json({
           message :"We have emailed one time login link to you. Please check your email"
    })


   

})

r.get("/post/signin", async (req,res)=>{

    try {

        const token=req.query.token as string;
        const decodedToken= jwt.verify(token, process.env.EMAIL_JWT_PASSWORD!) as JwtPayload ;
    

        if(!decodedToken.userId){
            res
            .status(411)
            .json({
                message:"Invalid Credentials...."
            })
            return;
        }
       
        const adminToken= jwt.sign({
            userId:decodedToken.userId
        },process.env.USER_JWT_PASSWORD!)
        res
        .json({
            token:adminToken
        })
        
    } catch (error) {
            
        res
        .status(500)
        .json({
            message:"Something went wrong. Please try again"
        })
    }
})


export default r;