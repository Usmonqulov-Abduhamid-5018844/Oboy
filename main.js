import express from "express";
import dotenv from "dotenv";
dotenv.config()
import mainRoutes from "./router/index.js"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


// const options = {
//     definition: {
//       openapi: "3.1.0",
//       info: {
//         title: "Oboy shop",
//         version: "0.1.0",
//         description:
//           "This is a simple CRUD API application made with Express and documented with Swagger",
//       },
//       servers: [
//         {
          
//           url: "http://localhost:5000",
//         },
//       ],
//     },
//     apis: ["./router/*.js"],
//   };

/**
 * @swagger
 * /api:
 *   post:
 *     summary: Login to get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "your_jwt_token"
 *                 expires_in:
 *                   type: integer
 *                   example: 3600
 */

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Oboy shop",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
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