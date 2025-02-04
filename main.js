import express from "express";
import dotenv from "dotenv";
dotenv.config()
import AllRoutes from "./router/index.js"
let Port = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use("", AllRoutes)

app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}`);
})