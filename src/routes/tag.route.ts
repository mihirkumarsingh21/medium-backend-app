import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { author } from '../middlewares/author.middleware.js';
import { addTag } from '../controllers/tag.controller.js';

const route = express.Router();


route.post("/add/:articleId", protectedRoute, author, addTag);


export default route;