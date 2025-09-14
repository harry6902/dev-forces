
import type {Request, Response, NextFunction}  from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export function usermiddleware(req: Request, res: Response , next: NextFunction)
{
    const token= req.headers.authorization as string;
    if(!token){
        res
        .status(400)
        .json({
            message:"No token"
        })
        return;
    }


    try {
        
        const decoded=jwt.verify(token,process.env.USER_JWT_PASSWORD!) as JwtPayload;
        
        if(decoded.userId){
           
            req.userId= decoded.userId;
            next();

        }
        else{
            res.status(403).json({
                message:"Invalid token"
            })
            return;
        }
        
    } catch (error) {
        res.status(403).json({
            message:"Invalid token"
        })
        return;
        
    }


}