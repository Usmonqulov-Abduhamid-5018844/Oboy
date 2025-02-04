import joi from "joi"

const ProductValidation = await joi.object({
    name_UZ: joi.string().required(),
    user_RU: joi.string().required(),
    brand_id: joi.number().positive().required(),
    country_id: joi.number().positive().required(),
    price: joi.number().positive().required(),
    oldPrice: joi.number().positive().required(),
    available: joi.number().positive().required(),
    descriptionUZ: joi.string().required(),
    descriptionRU: joi.string().required(),
    washable: joi.boolean().required(),
    size: joi.string().required()
})

const ProductPatchValidation = await joi.object({
    name_UZ: joi.string(),
    user_RU: joi.string(),
    brand_id: joi.number().positive(),
    country_id: joi.number().positive(),
    price: joi.number().positive(),
    oldPrice: joi.number().positive(),
    available: joi.number().positive(),
    descriptionUZ: joi.string(),
    descriptionRU: joi.string(),
    washable: joi.number().positive(),
    size: joi.string()
})

export {ProductValidation, ProductPatchValidation}