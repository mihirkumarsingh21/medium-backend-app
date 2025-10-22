
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const addingComment = async (req: AuthRequest, res: Response) : Promise < void > => {

    try {
        const { articleId } = req.params as {
            articleId: string
        }
        
        const userId = req.userId;

        const { comment } = req.body as {
            comment: string
        }


        const article = await client.article.findUnique({
            where: {
                id: Number(articleId)
            }
        })

        if(!article) {
            res.status(404).json({
                success: false,
                message: "article not found : article does not exsit with this id."
            })
            return;
        }

      const newComment = await client.comment.create({
        data: {
            comments: comment,
            user: {
                connect: {id: Number(userId)}
            },
            article: {
                connect: {id: Number(articleId)}
            }
        }
       })

       if(!newComment) {
            res.status(400).json({
                success: false,
                message: "failed to add comment."
            })
            return;
       }

       res.status(201).json({
            success: true,
            message: "comment added successfully.",
            addedComment: newComment
       })

       return;

    } catch (error: any) {
        console.log(`error while adding comment : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const updateComment = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const {articleId} = req.params as {
            articleId: string
        }

        const userId = req.userId;

        const isArticleAndUserExsitInCommentTable = await client.comment.findFirst({
            where: {
                article_id: Number(articleId),
                AND: {
                    user_id: Number(userId)
                }

            }
        })

        if(!isArticleAndUserExsitInCommentTable) {
            res.status(404).json({
                success: false,
                message: "not found : user and article does not exsit in the comment table."
            })
            return;
        }

        


    } catch (error: any) {
        console.log(`error while updating comment :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}