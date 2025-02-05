import joi from "joi"

const categoryitemValidation =  joi.object({
    category_id: joi.number().required(),
    product_id: joi.number().required(),
})

const categoryitemPatchValidation =  joi.object({
    category_id: joi.number(),
    product_id: joi.number(),
})

export {categoryitemValidation, categoryitemPatchValidation}