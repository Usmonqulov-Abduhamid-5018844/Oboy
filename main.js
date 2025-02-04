import express from "express";
import dotenv from "dotenv";
dotenv.config()
import mainRoutes from "./router/index.js"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Oboy shop",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./router/*.js"],
  };
const specs = swaggerJsdoc(options);

let Port = process.env.PORT || 4000

const app = express();
app.use(express.json());

app.use("/api", mainRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}`);
})