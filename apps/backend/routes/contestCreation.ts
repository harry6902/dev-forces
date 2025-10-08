import { Router } from "express";
import { createChallengeBody, createContestBody, editChallengeContestBody, editChallengeMaxPointsBody, editChallengeNotionDocIdBody, editChallengeTitleBody, editContestDurationBody, editContestStartTimeBody, editContestTitleBody } from "../types";
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

           
             try {
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
             } catch (error) {
                       res
                       .status(500)
                       .json({
                        message:" Something went wrong.."
                       })
    
  }

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
               
                  try {
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
                  } catch (error) {
                   res
                   .status(500)
                   .json({
                    message:" Something went wrong.."
                   })
                   
                  }
   
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
          
             try {
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
             } catch (error) {
                res
                .status(500)
                .json({
                 message:" Something went wrong.."
                })
             }
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

                try {
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
                } catch (error) {
                   res
                   .status(500)
                   .json({
                    message:" Something went wrong.."
                   })

 }
})

r.post("/createChallenge", async (req,res)=>{


    const {success,data} = createChallengeBody.safeParse(req.body);

            if(!success){
                res
                .status(411)
                .json({
                    message:"Input validation failed"
                })
                return;
            }

            try {
                  const challenge= await client.challenge.create({
                      data:{
                          title:data.title,
                          notionDocId: data.notionDocId,
                          maxPoints: data.maxPoints
                      }
                  })
              
                  const contesttoChallengeMapping = await client.contestToChallengeMapping.create({
                      data:{
                          contestId: data.contestId,
                          challengeId:challenge.id,
                          index: 0
                      }
                  })


                        res
                        .json({
                          message:`Challenge ${challenge.title} created successfully`
                        })

            } catch (error) {
            
               res
               .status(500)
               .json({
                message:" Something went wrong.."
               })
            
            }
})

r.post("/editChallengeTitle", async (req,res)=>{


    const {success, data}= editChallengeTitleBody.safeParse(req.body);

    if(!success){
          res
          .status(411)
          .json({
            message :"Input validation failed"
          })
          return;
    }

    try {
         
        const challenge= await client.challenge.update({
            where:{
                id: data.id
            },
            data:{
                title: data.title
            }
        })

        // const contestToChallenge = await client.contestToChallengeMapping.updateMany({
        //     where:{
        //         challengeId: data.id
        //     },
        //     data:{
        //         challengeId:challenge.id
        //     }
        // })


        res
        .json({
            message:"Challenge title updated successfully.."
        })
        
    } catch (error) {
        res
        .status(500)
        .json({
         message:" Something went wrong.."
        })
        
    }
    
})

r.post("/editChallengeNotionDocId", async (req,res)=>{

    const {success,data} = editChallengeNotionDocIdBody.safeParse(req.body);

    if(!success){

        res
        .status(411)
        .json({
            message: "Input validation failed"
        })
        return;

    }

    try {


        const challenge= await client.challenge.update({
            where: {
                id: data.id
            },
            data:{
                notionDocId: data.notionDocId
            }
        })

        res.json({
            message:`Notion doc of ${challenge.title} updated successfully`
        })
        
    } catch (error) {
          
        res
        .status(500)
        .json({
         message:" Something went wrong.."
        })
        
        
    }

})

r.post("/editChallengeMaxpoints", async (req,res)=>{


    const {success,data}= editChallengeMaxPointsBody.safeParse(req.body);
    if(!success){

        res
        .status(411)
        .json({
            message: "Input validation failed"
        })
        return;

    }

    try {

        const challenge= await client.challenge.update({
            where:{
                id: data.id
            },
            data:{
                maxPoints: data.maxPoints
            }
        })
        

        res
        .json({
            message:`Challenge ${challenge.title} maxpoints updated...`
        })
    } catch (error) {
        res
        .status(500)
        .json({
         message:" Something went wrong.."
        })
        
    }
})


r.post("/editChallengeContest", async (req, res)=>{

    const {success,data}= editChallengeContestBody.safeParse(req.body);
    if(!success){

        res
        .status(411)
        .json({
            message: "Input validation failed"
        })
        return;

    }
    try {

       const challengeToContestMapping= await client.contestToChallengeMapping.update({
        where: {
            id: data.contestToChallengeMappingId
        },
        data:{
            contestId:data.contestId
        }
       })

       res
       .json({
        message: "Contest-Challenge Mapping changed successfully..."
       })
    } catch (error) {

        res
        .status(500)
        .json({
         message:" Something went wrong.."
        })

        
    }

})

r.post("/check", async (req,res)=>{

    const pp= await client.contestToChallengeMapping.findMany({
        where:{

        },
        include:{
            challenge:true,
            contest:true
        }
    })
  
    res
    .json(pp)
})





export default r;