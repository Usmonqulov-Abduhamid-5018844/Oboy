import {Router} from 'express';
import {createCategoryItem,deleteCategoryItem,getAllCategoryItems,getCategoryItemById,updateCategoryItem} from '../controller/categoryItem.controller.js';
// import authorizatsiy from "../middlewares/authorizatsiya.js";
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";

let router = Router()


/**
 * @swagger
 * tags:
 *   name: categoryitem
 *   description: categoryitem management endpoints
 */

/**
 * @swagger
 * /api/categoryitem:
 *   get:
 *     summary: Get all categoryitem
 *     tags: [categoryitem]
 *     responses:
 *       201:
 *         description: All categoryitem
 *       400:
 *         description: Invalid request data
 */
router.get('/', getAllCategoryItems);


/**
 * @swagger
 * /api/categoryitem/{id}:
 *   get:
 *     summary: Get one categoryitem
 *     tags: [categoryitem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: categoryitem ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
router.get('/:id', getCategoryItemById);

/**
 * @swagger
 * /api/categoryitem:
 *   post:
 *     summary: categoryitem
 *     tags: [categoryitem]
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
router.post('/', createCategoryItem);


/**
 * @swagger
 * /api/categoryitem:
 *   patch:
 *     summary: categoryitem
 *     tags: [categoryitem]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             optional:
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
router.patch('/:id',autentifikatsiya(["admin"]),updateCategoryItem);


/**
 * @swagger
 * /api/categoryitem/{id}:
 *   delete:
 *     summary: Get one categoryitem
 *     tags: [categoryitem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: categoryitem ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
router.delete('/:id',autentifikatsiya(["admin"]), deleteCategoryItem);

export default router