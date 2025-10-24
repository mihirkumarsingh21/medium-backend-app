import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { author } from '../middlewares/author.middleware.js';
import { addTag, deleteTag, tag, updateTag } from '../controllers/tag.controller.js';

const route = express.Router();


route.post("/add/:articleId", protectedRoute, author, addTag);
route.patch("/update-tag/article/:articleId/tag/:tagId", protectedRoute, author, updateTag);
route.delete("/delete/:tagId", protectedRoute, author, deleteTag);
route.get("/single/:tagId", protectedRoute, tag);







export default route;