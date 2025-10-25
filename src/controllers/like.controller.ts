import e, { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { PrismaClient } from "@prisma/client";


const client = new PrismaClient();

export const addLike = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const userId = req.userId;
        const {articleId} = req.params as {
            articleId: string
        }
        let {type} = req.body;
        type = type.toUpperCase();
        if(!type || !["LIKE", "DISLIKE"].includes(type)) {
            res.status(400).json({
                success: false,
                message: "type not provided OR select a valid option."
            })
            return;
        }

        const isArticleAlreadyLike = await client.reaction.findUnique({
            where: {
                user_id_article_id: {
                    user_id: Number(userId),
                    article_id: Number(articleId)
                }
            }
        })

        if(!isArticleAlreadyLike) {
            const articleLiked = await client.reaction.create({
                data: {
                    type,
                    user: {
                        connect: {id: Number(userId)}
                    },
                    article: {
                        connect: {id: Number(articleId)}
                    },
                    like: type === "LIKE"? 1 : 0,
                    dislike: type === "DISLIKE"? 1 : 0
                }
            })

            if(!articleLiked) {
                res.status(400).json({
                    success: false,
                    message: "failed to like or dislike on article."
                })
                return;
            }

            res.status(200).json({
                success: true,
                message: `your article ${articleLiked.type.toLowerCase()}`
            })
            return;


        } else if(isArticleAlreadyLike.type !== type) {
            await client.reaction.update({
                where: {
                    id: Number(isArticleAlreadyLike.id)
                },
                data: {
                    type,
                    like: type === "LIKE"? 1 : 0,
                    dislike: type === "DISLIKE"? 1 : 0
                }
            })

            res.status(201).json({
                success: true,
                message: `reaction changed: ${type.toLowerCase()}`
            })
            return;
        } else if(isArticleAlreadyLike.type === type){
            await client.reaction.delete({
                where: {
                    user_id_article_id: {
                        user_id: isArticleAlreadyLike.user_id,
                        article_id: isArticleAlreadyLike.article_id
                    }
                }
            })

            res.status(200).json({
                success: true,
                message: `${type.toLowerCase()} removed`
            })
            return;
        }
        

    } catch (error: any) {
        console.log(`error while liking article : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}

export const getTotalLikeDislike = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        
    } catch (error: any) {
        console.log(`error while getting total like & dislike :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}