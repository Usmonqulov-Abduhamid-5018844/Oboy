import joi from "joi"

const brandValidation =  joi.object({
    nameUZ: joi.string().required(),
    nameRU: joi.string().required(),
    image: joi.string(),
})

const brandPatchValidation =  joi.object({
    nameUZ: joi.string(),
    nameRU: joi.string(),
    image: joi.string(),
})

export {brandValidation, brandPatchValidation}