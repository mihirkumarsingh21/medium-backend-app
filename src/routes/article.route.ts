import express from "express";
import { addingArticle, deleteArticle, gettingAllArticles, gettingSingleArticle, updateArticle } from "../controllers/article.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { author } from "../middlewares/author.middleware.js";

const route = express.Router();

route.post("/add", protectedRoute, author, addingArticle);
route.put("/update/:id", protectedRoute, author, updateArticle);
route.delete("/delete/:id", protectedRoute, author, deleteArticle);


route.get("/single/:id", protectedRoute, gettingSingleArticle);
route.get("/all", protectedRoute, gettingAllArticles);






export default route;

