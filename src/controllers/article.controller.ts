import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";

    const client = new PrismaClient();

export const addingArticle = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {

        const { title, description, body } = req.body;
        if(!title || !description || !body) {
            res.status(400).json({
                success: false,
                message: "these fields are required."
            })
            return;
        }

        const article = await client.article.create({
            data: {
                title,
                description,
                body,
                user: {connect: { id: Number(req.userId) }}
            }
        })

        if(!article)  {
            res.status(400).json({
                success: false,
                message: "failed to add article."
            })
            return;
        }

        res.status(201).json({
            success: true,
            message: "article addedd successfully."
        })

        return;

    } catch (error: any) {
        console.log(`error while adding article : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const gettingSingleArticle =  async (req: Request, res: Response) : Promise < void > => {
    try {
        const {id} = req.params as {
            id: string
        }

        const singleArticle = await client.article.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!singleArticle) {
            res.status(404).json({
                success: false,
                message: "article not found : article does not exsit with id."
            })
            return;
        }

        

        res.status(200).json({
            success: true,
            artile: singleArticle 
        })
        
        return;

    } catch (error: any) {
        console.log(`error while getting single article : ${error.message}`);
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const gettingAllArticles = async (req: Request, res: Response) :Promise < void > => {
    try {

        const articles = await client.article.findMany();
        if(!articles) {
            res.status(404).json({
                success: false,
                message: "articles not fond"
            })
            return;
        }

        res.status(200).json({
            success: true,
            articles: articles
        })

        return;

    } catch (error: any) {
        console.log(`error while getting all articles : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}


export const updateArticle = async (req: Request, res: Response) : Promise < void > => {
    try {
        const {id} = req.params as {
            id: string
        }

        const isArticleExsit = await client.article.findUnique({
            where: {
                id: Number (id)
            }
        })
        if(!isArticleExsit) {
            res.status(404).json({
                success: false,
                message: "not found : article does not exsit with this id."
            })
            return;
        }

        const updatedArticle = await client.article.update({
            where: {
                id: Number(id)
            },
            data: req.body
        })

        if(!updatedArticle) {
            res.status(400).json({
                success: false,
                message: "failed to update article."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Article updated successfully.",
            updatedArticle
        })

        return;
      

    } catch (error: any) {
        console.log(`error while updating article :${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const deleteArticle = async (req: Request,  res:  Response) : Promise < void > => {
    try {
        const {id} = req.params as {
            id: string
        }

        const isArticleExsit = await client.article.findUnique({
            where: {
                id: Number (id)
            }
        })
        if(!isArticleExsit) {
            res.status(404).json({
                success: false,
                message: "not found : article does not exsit with this id."
            })
            return;
        }

        const deletedArticle = await client.article.delete({
            where: {
                id: Number(id)
            }
        })


        if(!deletedArticle) {
            res.status(400).json({
                success: false,
                message: "failed to delete article."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "article deleted successfully."
        })
        return;

    } catch (error: any) {
        console.log(`error while deleting article : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })

        return;
    }
}




