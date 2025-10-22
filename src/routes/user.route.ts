import express from "express";
import { loginUser, logoutUser, makingAuthor, registerUser } from "../controllers/user.controller.js";
import { author } from "../middlewares/author.middleware.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.patch("/make-author/:userId", protectedRoute, author, makingAuthor);


export default route;