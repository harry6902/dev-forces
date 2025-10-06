
import type {Request,Response,NextFunction} from 'express';
 import jwt, { type JwtPayload } from 'jsonwebtoken'

export function adminmiddleware(req:Request,res:Response,next:NextFunction){

    const token = req.headers.token as string;
    
    if(!token){

        res.status(400)
        .json({
            message:"Missing token"
        })
    }
try {
    
        const decodedToken= jwt.verify(token,process.env.USER_JWT_PASSWORD!) as JwtPayload;

        if(decodedToken.userId){
            req.userId=decodedToken.userId;
            next();
        }
        else{
            res.status(400)
            .json({
                message:"Invalid token"
            })
        }
} catch (error) {

     res.status(500)
     .json({
        message:"Something went wrong. Please try again..."
     })
    
}

    

}