import Joi from "joi";

let registerValidation = Joi.object({
    fullname: Joi.string().max(20).min(2).required(),
    phone: Joi.string().max(12).min(12).required(),
    password: Joi.string().max(25).min(4).required(),
    role: Joi.string(),
});

export  {registerValidation}