import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { follow } from "../controllers/follow.controller.js";


const route = express.Router();

route.post("/author/autherId", protectedRoute, follow);


export default route;