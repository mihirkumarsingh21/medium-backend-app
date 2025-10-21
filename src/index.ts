import express  from "express";
import dotenv from "dotenv";
import articleRoute from "./routes/article.route.js"
import authRoute from "./routes/user.route.js"

dotenv.config();
const app = express();

app.use(express.json());

app.use("/medium/api/v1/users", authRoute);

app.use("/medium/api/v1/articles", articleRoute)

const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`server is running at port ->  http://localhost:${PORT}`);

})