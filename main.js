import express from "express";
import dotenv from "dotenv";
import mainRoutes from "./router/index.js";
dotenv.config()
let Port = process.env.PORT

const app = express();
app.use(express.json());

app.use("/api", mainRoutes)

app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}`);
})