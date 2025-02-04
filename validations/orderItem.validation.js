import joi from "joi"

const OrderItemValidation = await joi.object({
    product_id: joi.number().positive().required(),
    orderItem_id: joi.number().positive().required(),
    count: joi.number().positive().required(),
    total: joi.number().positive().required()
})

const OrderItemPatchValidation = await joi.object({
    product_id: joi.number().positive(),
    orderItem_id: joi.number().positive(),
    count: joi.number().positive(),
    total: joi.number().positive()
})

export {OrderItemValidation, OrderItemPatchValidation}