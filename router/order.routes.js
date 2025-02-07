import {create, findAll, findOne } from "../controller/order.controller.js"
import {Router} from "express"
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";
import { Authorization } from "../middlewares/authorizatsya.js";

let route = Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: order management endpoints
 */

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all order
 *     tags: [Order]
 *     responses:
 *       201:
 *         description: All order
 *       400:
 *         description: Invalid request data
 */
route.get("/", findAll);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get one Order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
route.get("/:id",Authorization, findOne);

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               user_id
 *               totalprice
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 4
 *               totalprice:
 *                 type: integer
 *                 example: 25000
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
route.post("/", autentifikatsiya(["admin"]), create);

export default route