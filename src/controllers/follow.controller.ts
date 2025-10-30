import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const follow = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const {autherId} = req.params;
        const {type} = req.body;
    

        if(!type) {
            res.status(400).json({
                success: false,
                message: "type not provided."
            })
            return;
        }

        const auther = await client.user.findUnique({
            where: {
                id: Number(autherId),
                role: "USER"
            }
        })

        if(!auther) {
            res.status(404).json({
                success: false,
                message: "auhor does not exsit with this id."
            })
            return;
        }

        const isAutherAlreadyFollowedByThisUser = await client.follow.findFirst({
            where: {
                follower_id: Number(req.userId)
            }
        })

        if(!isAutherAlreadyFollowedByThisUser){
            await client.follow.create({
                data: {
                    follower: {
                        connect: {
                            id: Number(req.userId)
                        }
                    }
                }
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}