import {create, findAll, findOne, remove, update} from "../controller/product.controller.js"
import {Router} from "express"
// import authorizatsiy from "../middlewares/authorizatsiya.js"
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";

let route = Router()

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: product management endpoints
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all Product
 *     tags: [Product]
 *     responses:
 *       201:
 *         description: All Product
 *       400:
 *         description: Invalid request data
 */
route.get("", findAll);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get one Product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
route.get("/:id", findOne);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Televizor"
 *               price:
 *                 type: string
 *                 example: 1200000
 *               image:
 *                 type: string
 *                 example: "form_date"
 *               category_id:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
route.post("", create);

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Product id
 *     tags: [Product]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             optional:
 *               - name
 *               - price
 *               - image
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Televizor"
 *               price:
 *                 type: string
 *                 example: 1200000
 *               image:
 *                 type: string
 *                 example: "form_date"
 *               category_id:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
route.patch("/:id",autentifikatsiya(["admin"]), update);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Get one product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: product ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
route.delete("/:id",autentifikatsiya(["admin"]), remove);

export default route