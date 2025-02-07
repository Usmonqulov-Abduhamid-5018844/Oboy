import {Router} from 'express';
import {createCategory,deleteCategory,getAllCategories,getCategoryById,updateCategory} from '../controller/category.controller.js';
import upload  from '../multer/file.js';
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";
import { Authorization } from '../middlewares/authorizatsya.js';

let router = Router()


/**
 * @swagger
 * tags:
 *   name: category
 *   description: category management endpoints
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all category
 *     tags: [category]
 *     responses:
 *       201:
 *         description: All category
 *       400:
 *         description: Invalid request data
 */
router.get('/', getAllCategories);


/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get one category
 *     tags: [category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
router.get('/:id',Authorization, getCategoryById);


/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: category
 *     tags: [category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUZ
 *               - nameRU
 *               - image
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *               image:
 *                 type: file
 *                 example: "image"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/',autentifikatsiya(["admin"]), upload.single("image"), createCategory);

/**
 * @swagger
 * /api/category:
 *   patch:
 *     summary: category
 *     tags: [category]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             optional:
 *               - nameUZ
 *               - nameRU
 *               - image
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *               image:
 *                 type: file
 *                 example: "image"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.patch('/:id',autentifikatsiya(["admin"]),updateCategory);


/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Get one category
 *     tags: [category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
router.delete('/:id',autentifikatsiya(["admin"]), deleteCategory);

export default router