import joi from "joi"

const categoryValidation =  joi.object({
    nameUZ: joi.string().required(),
    nameRU: joi.string().required(),
    image: joi.string(),
})

const categoryPatchValidation =  joi.object({
    nameUZ: joi.string(),
    nameRU: joi.string(),
    image: joi.string(),
})

export {categoryValidation, categoryPatchValidation}