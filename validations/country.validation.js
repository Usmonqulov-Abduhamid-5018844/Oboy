import joi from "joi"

const countryValidation =  joi.object({
    nameUZ: joi.number().required(),
    nameRU: joi.number().required(),
})

const countryPatchValidation =  joi.object({
    nameUZ: joi.number(),
    nameRU: joi.number(),
})

export {countryValidation, countryPatchValidation}