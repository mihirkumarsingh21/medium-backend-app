import { NextFunction, Response } from "express";
import {AuthRequest} from "../middlewares/auth.middleware.js"
import { PrismaClient } from "@prisma/client";

export const author = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        
        const user = await client.user.findUnique({
            where: {
                id: Number(req.userId)
            }
        })

        if(user?.role === "USER") {
            res.status(403).json({
                success: false,
                message: "access denied : you don't have permission to perform this action."
            })
            return;
        }

        next();
        
    } catch (error: any) {
        console.log(`error in author middleware : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}
