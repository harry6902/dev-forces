import { Router } from "express";
 import {client} from "db/client"
const r=Router();
// to get active contests
r.get("/active",(req,res)=>{

 const {offset,page}= req.query;
})
// to get finished contests
r.get("/finished",(req,res)=>{
    const {offset,page}=  req.query;
})

// to get challenges and start time of a particular contest
r.get("/:contestId",(req,res)=>{

})

//to get details of particular challenge
r.get("/:contestId/:challengeId",(req,res)=>{

})

// to get leaderboard for a particular contest
r.get("/leaderboard/:contestId",(req,res)=>{

})

// to submit a challenge
r.post("/submit/:challengeId",(req,res)=>{

    // have rate limitting
    // max 20 submissiions for a person
    // forward the response to GPT
    // store the response in sorted set in DB



})



export default r;