import {Router} from 'express';
import {createCategoryItem,deleteCategoryItem,getAllCategoryItems,getCategoryItemById,updateCategoryItem} from '../controller/categoryItem.controller.js';

let router = Router()

router.get('/', getAllCategoryItems);
router.get('/:id', getCategoryItemById);
router.post('/', createCategoryItem);
router.patch('/:id',updateCategoryItem);
router.delete('/:id', deleteCategoryItem);

export default router