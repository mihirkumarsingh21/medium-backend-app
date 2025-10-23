import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const addTag = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const {articleId} = req.params as {
            articleId: string
        }

        const {tagName} = req.body as {
            tagName: string
        }
        if(!tagName) {
            res.status(400).json({
                success: false,
                message: "tag name not provided."
            })
            return;
        }

        if(!articleId) {
            res.status(404).json({
                success: false,
                message: "article id not found in your url."
            })
            return;
        }

        const isArticleExsit = await client.article.findUnique({
            where: {
                id: Number(articleId)
            }
        })

        if(!isArticleExsit) {
            res.status(404).json({
                success: false,
                message: "article not found : article does not exsit with id."
            })
            return;
        }

        const tagAdded = await client.tag.create({
            data: {
                name: tagName,
                articles: {
                    connect: [ {
                        id: Number(articleId)
                }]
                }
            }
        })

        if(!tagAdded) {
            res.status(400).json({
                success: false,
                message: "failed to add tag"
            })
            return;
        }

        res.status(201).json({
            success: true,
            messsage: "tag added successfully."
        })
        return;

    } catch (error: any) {
        console.log(`error while adding tag ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const updateTag = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        
    } catch (error: any) {
        console.log(`error while updating tag : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}