import express  from "express";
import dotenv from "dotenv";
import articleRoute from "./routes/article.route.js";
import authRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import commentRoute from "./routes/comment.route.js";
import tagRoute from "./routes/tag.route.js";
import categoryRoute from "./routes/category.route.js";
import likeRoute from "./routes/like.route.js";
import followRoute from "./routes/follow.route.js";



dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/medium/api/v1/users", authRoute);

app.use("/medium/api/v1/articles", articleRoute)
app.use("/medium/api/v1/comments", commentRoute);
app.use("/medium/api/v1/tags", tagRoute);
app.use("/medium/api/v1/category", categoryRoute);
app.use("/medium/api/v1/likes", likeRoute);
app.use("/medium/api/v1/follows", followRoute);






const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`server is running at port ->  http://localhost:${PORT}`);

})