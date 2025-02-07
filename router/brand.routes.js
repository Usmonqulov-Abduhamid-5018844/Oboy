import { Router } from 'express';
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from '../controller/brand.controller.js';
import upload from "../multer/file.js"
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";
import { Authorization } from '../middlewares/authorizatsya.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: brand
 *   description: breand management endpoints
 */

/**
 * @swagger
 * /api/brand:
 *   get:
 *     summary: Get all brand
 *     tags: [brand]
 *     responses:
 *       201:
 *         description: All brand
 *       400:
 *         description: Invalid request data
 */
router.get('/', getAllBrands);


/**
 * @swagger
 * /api/brand/{id}:
 *   get:
 *     summary: Get one brand
 *     tags: [brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: breand ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
router.get('/:id',Authorization, getBrandById);


/**
 * @swagger
 * /api/brand:
 *   post:
 *     summary: brand
 *     tags: [brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUZ
 *               - nameRU
 *               - logo
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *               logo:
 *                 type: file
 *                 example: "image"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/',autentifikatsiya(["admin"]), upload.single('image'), createBrand); 


/**
 * @swagger
 * /api/brand:
 *   patch:
 *     summary: brand
 *     tags: [brand]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             optional:
 *               - nameUZ
 *               - nameRU
 *               - logo
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *               logo:
 *                 type: file
 *                 example: "image"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.patch('/:id',autentifikatsiya(["admin"]), upload.single('image'), updateBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   delete:
 *     summary: Get one brand
 *     tags: [brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: brand ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
router.delete('/:id',autentifikatsiya(["admin"]), deleteBrand);

export default router;
