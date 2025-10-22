import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string
}


export const protectedRoute = async (req: AuthRequest, res: Response, next: NextFunction) : Promise < void > => {
    try {
        
       const token = req.cookies["mediumToken"] || req.cookies.mediumToken;
       if(!token || typeof token === "undefined") {
            res.status(401).json({
                success: false,
                message: "Unauthorized - No Token Provided" 
            })
            return;
       }

       const jwtSecretKey = process.env.JWT_SECRET_KEY;
       if(!jwtSecretKey) {
            res.status(404).json({
                success: false,
                message: "jwt secrect key does not exsit in env file."
            })
            return;
       }

      const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;

      req.userId = decoded.userId;

      next();


    } catch (error: any) {
        console.log(`error in auth middleware :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}