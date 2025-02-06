import {Router} from 'express';
import {createCountry,deleteCountry,getAllCountries,getCountryById,updateCountry} from '../controller/country.controller.js';
// import authorizatsiy from "../middlewares/authorizatsiya.js";
import {autentifikatsiya} from "../middlewares/autentifikatsiya.js";
import { Authorization } from '../middlewares/authorizatsya.js';

let router = Router()


/**
 * @swagger
 * tags:
 *   name: country
 *   description: country management endpoints
 */

/**
 * @swagger
 * /api/country:
 *   get:
 *     summary: Get all country
 *     tags: [country]
 *     responses:
 *       201:
 *         description: All country
 *       400:
 *         description: Invalid request data
 */
router.get('/', getAllCountries);


/**
 * @swagger
 * /api/country/{id}:
 *   get:
 *     summary: Get one country
 *     tags: [country]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: country ID
 *     responses:
 *       200:
 *         description: data
 *       403:
 *         description: Malumot Topilmadi
 */
router.get('/:id',Authorization, getCountryById);

/**
 * @swagger
 * /api/country:
 *   post:
 *     summary: country
 *     tags: [country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUZ
 *               - nameRU
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/',autentifikatsiya(["admin"]), createCountry);


/**
 * @swagger
 * /api/country:
 *   patch:
 *     summary: country
 *     tags: [country]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             optional:
 *               - nameUZ
 *               - nameRU
 *             properties:
 *               nameUZ:
 *                 type: string
 *                 example: "uz"
 *               nameRU:
 *                 type: string
 *                 example: "ru"
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 */
router.patch('/:id',autentifikatsiya(["admin"]),updateCountry);


/**
 * @swagger
 * /api/country/{id}:
 *   delete:
 *     summary: Get one country
 *     tags: [country]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: country ID
 *     responses:
 *       200:
 *         description: delete
 *       401:
 *         description: wrong delete error
 */
router.delete('/:id',autentifikatsiya(["admin"]), deleteCountry);

export default router
