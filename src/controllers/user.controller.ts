import { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response): Promise < void > => {
    try {
        const { username, email, password } = req.body as {
            username: string,
            email: string,
            password: string,
        }

        if(!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: "these fields are required."
            })
            return;
        }

        const user = await client.user.findFirst({
            where: {
                email
            }
        })

        if(user) {
            res.status(400).json({
                success: false,
                message: "user already register with this credentials."
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        if(!hashedPassword) {
            res.status(401).json({
                success: false,
                message: "failed to hash your password."
            })
            return;
        }


      const newUser = await client.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: "USER"
            }
        })


        if(!newUser) {
            res.status(400).json({
                success: false,
                message: "failed to create user."
            })
            return;
        }

        res.status(201).json({
            success: true,
            message: "user register successfully."
        })

        return;
        

    } catch (error: any) {
        console.log(`error while register user: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}

export const loginUser = async (req: Request, res: Response): Promise < void > => {
    try {
        const {email, password} = req.body as {
            email: string,
            password: string
        }

        if(!email || !password) {
            res.status(400).json({
                success: false,
                message: "these fields are required for login."
            })
            return;
        }

        const user = await client.user.findFirst({
            where: {
                email
            }
        })

        
        if(!user) {
            res.status(400).json({
                success: false,
                message: "user does not exsit with provided credentials."
            })
            return;
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) {
            res.status(400).json({
                success: false,
                message: "password are incorrect."
            })
            return;
        }

        await generateJwtTokenAndSetCookie(user.id, res);

        res.status(200).json({
            success: true,
            message: "user login succesfully."
        })

        return;

    } catch (error: any) {
        console.log(`error while login user : ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const logoutUser = async (req: Request, res: Response): Promise < void > => {
    try {
        res.clearCookie("mediumToken").status(200).json({
            success: true,
            message: "user logout successfully."
        })
        return;
    } catch (error: any) {
        console.log(`error while logout user : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const makingAuthor = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const {userId} = req.params as {
            userId: string
        }
    
        const isUserExsit = await client.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if(!isUserExsit) {
            res.status(404).json({
                success: false,
                message: "user not found : user does not exsit with this id."
            })
            return;
        }

        const author = await client.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                role: "AUTHOR"
            }
        })

        res.status(201).json({
            success: true,
            author: author
        })

        return;
        

    } catch (error: any) {
        console.log(`error while making author ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}


