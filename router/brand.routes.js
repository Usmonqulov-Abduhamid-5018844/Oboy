import { Router } from 'express';
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from '../controller/brand.controller.js';
import upload from "../multer/brand.js"

const router = Router();

router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.post('/', upload.single('image'), createBrand); 
router.patch('/:id', upload.single('image'), updateBrand); 
router.delete('/:id', deleteBrand);

export default router;
