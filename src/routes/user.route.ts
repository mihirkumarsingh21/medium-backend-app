import express from "express";
import { loginUser, logoutUser, makingAuthor, registerUser } from "../controllers/user.controller.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.patch("/make-author/:userId", makingAuthor);


export default route;