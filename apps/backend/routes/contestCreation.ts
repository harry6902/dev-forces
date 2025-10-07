import { Router } from "express";
import { createContestBody, editContestDurationBody, editContestStartTimeBody, editContestTitleBody } from "../types";
import { client } from "db/client";
import { da } from "zod/locales";



const r=Router();

r.post("/contest",async (req,res)=>{

    const {success,data,error}= createContestBody.safeParse(req.body);

    if(!success){
        res
        .status(411)
        .json({
            message :"Input validation failed"
        })
        return;
    }
    if(!data){
        res
        .status(400)
        .json({
            message: "Bad request"
        })
    }
     

    const contest= await client.contest.create({
        data:{
            title: data.title,
            startTime: data.startTime,
            Duration: data.duration

        }
    })

    res
    .json({
        message: `Contest named ${data.title} created`
    })

})

r.post("/editContestTitle", async(req,res)=>{

    const {success,data}= editContestTitleBody.safeParse(req.body);

    if(!success){
        res
        .status(411)
        .json({
            message: "Input validation failed"
        })
        return;
    }

    const contest=await client.contest.update({
        where:{
            id:data.id
        },
        data:{
             title:data.title
        }
    })

    res
    .json({
        message: "Contest title updated successfully"
    })
   
})

r.post("/editContestStartTime", async (req, res)=>{

    const {success,data}= editContestStartTimeBody.safeParse(req.body);
    if(!success){
        res
        .status(411)
        .json({
            message:" Input validation failed"
        })
        return;
    }

    const contest= await client.contest.update({
        where:{
            id:data.id
        },
        data:{
            startTime: data.startTime
        }
    })

    res
    .json({
        message:`Contest ${contest.title} start time updated successfully`
    })
})

r.post("/editContestDuration", async (req,res)=>{
    const {success,data}= editContestDurationBody.safeParse(req.body);

    if(!success){
        res
        .status(411)
        .json({
            message:"Input Validation failed"
        })
        return;
    }

    const contest= await client.contest.update({
        where:{
            id:data.id
        },
        data:{
            Duration: data.duration
        }
    })
    res.
    json({
        message: `Contest ${contest.title} duration updated successfully`
    })
})





export default r;