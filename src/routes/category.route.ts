import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { author } from "../middlewares/author.middleware.js";
import { addCategory, updateCategory, allCategory, singleCategory } from "../controllers/category.controller.js";

const route = express.Router();

route.post("/add/:articleId", protectedRoute, author, addCategory);
route.patch("/update/:categoryId", protectedRoute, author, updateCategory);
route.get("/all", protectedRoute, allCategory);
route.get("/single/:categoryId", protectedRoute, singleCategory);



export default route; 