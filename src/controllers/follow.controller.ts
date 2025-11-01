import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
});

export const follow = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        
        const {autherId} = req.params;
        const isAutherExsit = await client.user.findFirst({
            where: {
                AND: [
                    {
                        id: Number(autherId)
                    },
                    {
                        role: "AUTHOR"
                    }
                ]
             
            }
        })

        if(!isAutherExsit) {
            res.status(404).json({
                success: false,
                message: "author not found."
            })

            return;
        }

        if(req.userId === autherId) {
            res.status(400).json({
                success: false,
                message: "you can not follow themselve."
            })
            return;
        }

        const isAutherFollowed = await client.follow.findUnique({
            where: {
                follower_id_following_id: {
                    follower_id: Number(req.userId),
                    following_id: Number(autherId)
                }
            }
        })
    
        if(!isAutherFollowed) {
            const authorFollowed = await client.follow.create({
                data: {
                    follower: {
                        connect: {
                            id: Number(req.userId)
                        }
                    },
                    following: {
                        connect: {
                            id: Number(autherId)
                        }
                    }
                }
            })

           const followerIncrement = await client.user.update({
                where: {
                    id: Number(autherId)
                },
                data: {
                    followerCount: {
                        increment: 1
                    },
                    followingCount: {
                        increment: 1
                    }
                }
            })

            if(!authorFollowed || !followerIncrement) {
                res.status(400).json({
                    success: false,
                    message: "failed to follow author"
                })
                return;
            }
            res.status(200).json({
                success: true,
                message: "author followed successfully.",
                followers: followerIncrement.followerCount,
                following: followerIncrement.followingCount
            })
            return;
        } else {


            await client.user.update({
                where: {
                    id: Number(autherId)
                },
                data: {
                    followerCount: {
                        decrement: 1
                    },
                    followingCount: {
                        decrement: 1
                    }
                }
            })

            const unfollow = await client.follow.delete({
                where: {
                    follower_id_following_id: {
                        follower_id: Number(req.userId),
                        following_id: Number(autherId)
                    }
                }
            })
            if(!unfollow) {
                res.status(400).json({
                    success: false,
                    message: "failed to unfollow author."
                })
                return;
            }

            res.status(200).json({
                success: false,
                message: "auhor unfollow successfully.",
            })
            return;

        }
        
       
    } catch (error: any) {
        console.log(`error while follow : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}

export const gettingAuthorFollowers = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        
      
        const user = await client.user.findUnique({
            where: {
                id: Number(req.userId)
            }
        })

        if(!user) {
            res.status(404).json({
                success: false,
                message: "unauthorized user exsit."
            })
            return;
        }

        const authorFollowers = await client.follow.findMany({
            
           select: {
                follower: true,
           },
           orderBy: {
            createdAt: "desc"
           },
           
        })

        if(!authorFollowers) {
            res.status(400).json({
                success: false,
                message: "failed to get author followers."
            })
            return;
        }

        res.status(200).json({
            success: true,
            authorFollowers: authorFollowers
            
        })



    } catch (error: any) {
        console.log(`error while getting author followers : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}

export const gettingAuthorSingleFollowers = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
        const {userId} = req.params;

        const user = await client.user.findUnique({
            where: {
                id: Number(userId)
            }
        })
        if(!user) {
            res.status(404).json({
            success: false,
            message: "user not found."
        })
            return;
    }
       
    

        const authorSingleFollower = await client.follow.findFirst({
            where: {
                follower_id: Number(userId)
            },
            select: {
                follower: true
            }
        })

        if(!authorSingleFollower) {
            res.status(400).json({
                success: false,
                message: "failed to get author single follower or follower does not exsit."
            })
            return;
        }

        res.status(200).json({
            success: true,
            authorSingleFollower: authorSingleFollower
        })

        return;
    } catch (error: any) {
        console.log(`error while getting author single followers: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
        return;
    }
}


export const gettingAuthorFollowings = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {


        const authorFollowings = await client.follow.findMany({
            select: {
                following: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })


        if(!authorFollowings) {
            res.status(400).json({
                success: false,
                message: "failed to get author followings"
            })
            return;
        }


        res.status(200).json({
            success: true,
            authorFollowings: authorFollowings
        })

        return;

    } catch (error: any) {
        console.log(`error while getting author followings: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
        return;
    }
}

export const gettingAuthorSingleFollowings = async (req: AuthRequest, res: Response) : Promise < void > => {
    try {
        const {userId} = req.params;
        
        const user = await client.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        
        if(!user) {
            res.status(404).json({
                success: false,
                message: "user not found."
            })
            return;
        }

        const authorSingleFollowing = await client.follow.findFirst({
            where: {
                following_id: Number(userId)
            },
            select: {
                following: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        
        if(!authorSingleFollowing) {
            res.status(404).json({
                success: false,
                message: "NOT FOUND : failed to get author followings."
            })
            return;
        }

        res.status(200).json({
            success: true,
            authorSingleFollowing: authorSingleFollowing
        })
        return;

    } catch (error: any) {
        console.log(`error while getting author single followings: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
        return;
    }
}




