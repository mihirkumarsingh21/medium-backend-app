import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { addLike, getTotalLikeDislike } from "../controllers/like.controller.js";

const route = express.Router();

route.post("/article/:articleId/like", protectedRoute, addLike);
route.get("/articles/:id/reactions", protectedRoute, getTotalLikeDislike);

export default route;