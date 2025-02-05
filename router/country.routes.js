import {Router} from 'express';
import {createCountry,deleteCountry,getAllCountries,getCountryById,updateCountry} from '../controller/country.controller.js';

let router = Router()

router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.post('/', createCountry);
router.patch('/:id',updateCountry);
router.delete('/:id', deleteCountry);

export default router
