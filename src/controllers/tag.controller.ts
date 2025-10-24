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

        const {articleId, tagId} = req.params as {
            articleId: string
            tagId: string
        }
        const {tagName} = req.body as {
            tagName: string
        }


           if(!articleId|| !tagId) {
            res.status(404).json({
                success: false,
                message: "article or tag id is not present in your url."
            })
            return;
        }

        if(!tagName) {
            res.status(400).json({
                success: false,
                message: "tag name not provided."
            })
            return;
        }

     
        const isArticleWithTag = await client.article.findFirst({
            where: {
                id: Number(articleId),
                tags: {
                    some: {
                        id: Number(tagId)
                    }
                }
            }
        })

        

        if(!isArticleWithTag) {
            res.status(404).json({
                success: false,
                message: "article does not contain this tag."
            })
            return
        }

        const tagUpdated = await client.tag.update({
            where: {
                id: Number(tagId)
            },
            data: {
                name: tagName
            }
        })


        if( !tagUpdated) {
            res.status(400).json({
                success: false,
                message: "failed to update articel tag Or tag name."
            })
            return;
        }

        if(tagUpdated.name === tagName) {
            res.status(400).json({
                success: false,
                message: "this tag already with article." 
           })
            return;
        }
        

        res.status(201).json({
            success: true,
            message: "your tag updated successfuly."
        })

        return;
        
    
    } catch (error: any) {
        console.log(`error while updating tag : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const deleteTag = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
        const {tagId} = req.params as {
            tagId: string
        }

        if(!tagId) {
            res.status(400).json({
                success: false,
                message: "tag id not provided in url."
            })
            return;
        }

        const isTagExsit = await client.tag.findUnique({
            where: {
                id: Number(tagId)
            }
        })

        if(!isTagExsit) {
            res.status(404).json({
                success: false,
                message: "tag are alredy deleted or not provided in the url"
            })
            return;
        }

        const tagDeleted = await client.tag.delete({
            where: {
                id: Number(tagId)
            }
        })

        

        if(!tagDeleted) {
            res.status(400).json({
                success: false,
                message: "failed to delete your tag."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "your tag deleted successfully."
        })

        return;

    } catch (error: any) {
        console.log(`error while deleting tag : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}