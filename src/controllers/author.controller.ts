import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { PrismaClient } from "@prisma/client";


const client = new PrismaClient({
    omit: {
        user: {
            password: true
        },
        author: {
            id: true,
            user_id: true
        }
    }
})

export const createAuthorProfile = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
        const autherId = req.userId;
        const {bio} = req.body;
        const author = await client.user.findUnique({
            where: {
                id: Number(autherId)
            }
        })

        if(!author) {
            res.status(404).json({
                success: false,
                message: "NOT FOUND : auther does not exsit."
            })
            return;
        }

        const authorProfile = await client.author.create({
            data: {            
                user: {
                    connect: {
                        id: Number(autherId)
                    }
                },
                bio
            }
        })

        if(!authorProfile) {
            res.status(200).json({
                success: true,
                message: "failed to create author profile."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "author profile created successfully.",
            authorProfile
        })

        return;
        
    } catch (error:any) {
        console.log(`error while creating author profile :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}


export const gettingAuthorProfile = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
        const {authorId} = req.params;
        if(!authorId) {
            res.status(400).json({
                success: false,
                message: 'author id does not exsit in your url.'
            })
            return;
        }

        const authorProfile = await client.author.findUnique({
            where: {
                id: Number(authorId),
            },
            include:{
                user: {
                    select:{
                        username: true,
                        followerCount: true,
                        followingCount: true
                    }
                }
            }
        })

        if(!authorProfile) {
            res.status(404).json({
                success: false,
                message: "NOT FOUND : author profile not found or author does not exsit with this id."
            })
            return;
        }

        res.status(200).json({
            success: true,
            authorProfile: authorProfile
        })

        return;

    } catch (error: any) {
        console.log(`error while getting author profile: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something wrong: ${error.message}`
        })
        return;
    }
}

