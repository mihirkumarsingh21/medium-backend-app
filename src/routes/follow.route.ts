import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { follow, gettingAuthorFollowings, gettingAuthorSingleFollowers, gettingAuthorSingleFollowings } from "../controllers/follow.controller.js";
import { gettingAuthorFollowers } from "../controllers/follow.controller.js";


const route = express.Router();

route.post("/author/:autherId", protectedRoute, follow);
route.get("/author/followers", protectedRoute, gettingAuthorFollowers);
route.get("/user/:userId/followers", protectedRoute, gettingAuthorSingleFollowers);
route.get("/author/followings", protectedRoute, gettingAuthorFollowings);
route.get("/user/:userId/followings", protectedRoute, gettingAuthorSingleFollowings);





export default route;