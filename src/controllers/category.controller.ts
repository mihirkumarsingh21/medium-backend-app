import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.middleware.js"
import { PrismaClient } from "@prisma/client"


const client = new PrismaClient();


export const addCategory = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
      
        const {name} = req.body as {
            name: string
        }

        const {articleId} = req.params as {
            articleId: string
        }

        if(!name) {
            res.status(400).json({
                success: false,
                message: "category name not provided."
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
                message: "article not exsit with this id Or article id not present in your url."
            })
            return;
        }

        const categoryAdded = await client.category.create({
            data: {
                name,
                articles: {
                    connect: [
                        {id: Number(articleId)}
                    ]
                }
            }
        })

        if(!categoryAdded) {
            res.status(400).json({
                success: false,
                message: "failed to add category."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "category added successfully."
        })

        return;
     
    } catch (error: any) {
        console.log(`error while adding category : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}


export const updateCategory = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {

        const {name} = req.body as {
            name: string
        }

        const {categoryId} = req.params as {
            categoryId: string
        }

        if(!name) {
            res.status(400).json({
                success: false,
                message: "category name not provided."
            })
            return;
        }

        const isCategoryExsit = await client.category.findUnique({
            where: {
                id: Number(categoryId)
            }
        })

        if(!isCategoryExsit) {
            res.status(404).json({
                success: false,
                message: "category does not exsit with this id."
            })
            return;
        }

        if(isCategoryExsit.name === name) {
            res.status(400).json({
                success: false,
                message: "this category already exsit please choose different one."
            })
            return;
        }
        
        const categoryUpdated = await client.category.update({
            where: {
                id: Number(categoryId)
            },
            data: {
                name
            }
        })

        if(!categoryUpdated) {
            res.status(400).json({
                success: false,
                message: "failed to update category."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "category updated successfully."
        })
        return;

    } catch (error: any) {
        console.log(`error while updating category : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}

export const allCategory = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {

    
        const allCategory = await client.category.findMany({
            orderBy: {
                id: "desc",
            },
            include: {
                articles: true
            }
        });
        if(!allCategory) {
            res.status(400).json({
                success: false,
                message: "failed to get categories"
            })
            return;
        }

        

        res.status(200).json({
            success: true,
            categories: allCategory
        })
        return;

    } catch (error: any) {
        console.log(`error while getting all category : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }

}