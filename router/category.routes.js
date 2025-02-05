import {Router} from 'express';
import {createCategory,deleteCategory,getAllCategories,getCategoryById,updateCategory} from '../controller/category.controller.js';
import upload  from '../multer/brand.js';

let router = Router()

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', upload.single("image"), createCategory);
router.patch('/:id',updateCategory);
router.delete('/:id', deleteCategory);

export default router
