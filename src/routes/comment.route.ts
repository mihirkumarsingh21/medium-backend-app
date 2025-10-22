import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { addingComment, updateComment } from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/add/:articleId", protectedRoute, addingComment);
route.put("/update/:articleId", protectedRoute, updateComment);



export default route;