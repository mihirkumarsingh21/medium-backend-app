import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { addingComment, deleteComment, updateComment } from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/add/:articleId", protectedRoute, addingComment);
route.put("/update/:articleId", protectedRoute, updateComment);
route.delete("/delete/:articleId", protectedRoute, deleteComment);



export default route;