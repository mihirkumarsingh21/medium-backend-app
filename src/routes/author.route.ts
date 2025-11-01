import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { author } from "../middlewares/author.middleware.js";
import { createAuthorProfile, gettingAuthorProfile } from "../controllers/author.controller.js";



const route = Router();

route.post("/create-author-profile", protectedRoute, author, createAuthorProfile);
route.get("/profile/:authorId", protectedRoute, gettingAuthorProfile);

export default route;