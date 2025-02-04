import express from "express";
import dotenv from "dotenv";
import userRoute from "./router/user.routes.js";
dotenv.config()
let Port = process.env.PORT

const app = express();
app.use(express.json());

app.use("/api", userRoute)

app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}`);
})