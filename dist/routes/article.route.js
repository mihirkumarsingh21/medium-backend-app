import express from "express";
import { addingArticle, deleteArticle, gettingAllArticles, gettingSingleArticle, updateArticle } from "../controllers/article.controller.js";
const route = express.Router();
route.post("/add", addingArticle);
route.get("/single/:id", gettingSingleArticle);
route.get("/all", gettingAllArticles);
route.put("/update/:id", updateArticle);
route.delete("/delete/:id", deleteArticle);
export default route;
//# sourceMappingURL=article.route.js.map