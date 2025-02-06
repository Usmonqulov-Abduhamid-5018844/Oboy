import {Router} from "express";
import { all, login, register, verify } from "../controller/user.controller.js";
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";

const userRoute = Router()


/**
 * @swagger
 * tags:
 *   name: user
 *   description: user management endpoints
 */

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all user
 *     tags: [user]
 *     responses:
 *       201:
 *         description: All user
 *       400:
 *         description: Invalid request data
 */
userRoute.get("/all",autentifikatsiya(["admin"]), all);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "phone"
 *               password: 
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
userRoute.post("/login", login);


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "name"
 *               phone:
 *                 type: string
 *                 example: "phone"
 *               password: 
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "user or admin"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
userRoute.post("/register", register);



/**
 * @swagger
 * /api/user/verify:
 *   get:
 *     summary: user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "phone"
 *               otp: 
 *                 type: string
 *                 example: "otp"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
userRoute.post("/verify", verify);


export default userRoute