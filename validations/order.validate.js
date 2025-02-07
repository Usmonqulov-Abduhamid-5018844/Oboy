import joi from "joi";

const OrderValidation = joi.object({
  user_id: joi.number().positive().required(),
  totalPrice: joi.number().positive().required(),
  product: joi.any(),

});

const OrderPatchValidation = joi.object({
  user_id: joi.number().positive(),
  totalPrice: joi.number().positive(),
});

export { OrderValidation, OrderPatchValidation };
