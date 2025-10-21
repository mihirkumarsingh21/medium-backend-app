import jwt from "jsonwebtoken";
import { Response } from "express";


export const generateJwtTokenAndSetCookie = async (userId: number, res: Response): Promise < void > => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if(!jwtSecretKey) {
            res.status(404).json({
                success: false,
                message: "jwt secrect key not found in env file."
            })
            return;
        }

       const token =  jwt.sign({userId}, jwtSecretKey, {
         expiresIn: "24h",
       });
       if(!token) {
            res.status(400).json({
                success: false,
                message: "failed to generate jwt token."
            })
            return;
       }

       res.cookie("mediumToken", token);

       return;
       

    } catch (error: any) {
        console.log(`error while generating jwt token :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}