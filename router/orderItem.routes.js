import {create, findAll, findOne, remove, update} from "../controller/orderItem.controller.js"
import {Router} from "express"
// import authorizatsiy from "../middlewares/authorizatsiya.js"
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";
import { Authorization } from "../middlewares/authorizatsya.js";

let route = Router()

/**
 * @swagger
 * tags:
 *   name: Order_item
 *   description: order_item management endpoints
 */

/**
 * @swagger
 * /api/order_item:
 *   get:
 *     summary: Get all order_item
 *     tags: [Order_item]
 *     responses:
 *       201:
 *         description: All order_item
 *       400:
 *         description: Invalid request data
 */
route.get("/", findAll);

/**
 * @swagger
 * /api/order_item/{id}:
 *   get:
 *     summary: Get one Order_item
 *     tags: [Order_item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order_item ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
route.get("/:id",Authorization, findOne);

/**
 * @swagger
 * /api/order_item:
 *   post:
 *     summary: order_item
 *     tags: [Order_item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - orders_id
 *               - count
 *               - total
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 4
 *               order_id:
 *                 type: integer
 *                 example: 7
 *               count:
 *                 type: integer
 *                 example: 4
 *               total:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
route.post("/",autentifikatsiya(["admin"]), create);

/**
 * @swagger
 * /api/order_item/{id}:
 *   patch:
 *     summary: Order_item id
 *     tags: [Order_item]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - orders_id
 *               - count
 *               - total
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 4
 *               order_id:
 *                 type: integer
 *                 example: 7
 *               count:
 *                 type: integer
 *                 example: 4
 *               total:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
route.patch("/:id",autentifikatsiya(["admin"]), update);

/**
 * @swagger
 * /api/order_item/{id}:
 *   delete:
 *     summary: Get one Order_item
 *     tags: [Order_item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order_item ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
route.delete("/:id",autentifikatsiya(["admin"]), remove)

export default route