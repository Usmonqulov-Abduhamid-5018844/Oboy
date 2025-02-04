import { Router } from "express";
import userRoute from "./user.routes.js";
import orderRoute from "./order.routes.js";
import productRoute from "./product.routes.js";
import orderItemRoute from "./orderItem.routes.js";

const mainRoutes = Router();

mainRoutes.use("", userRoute)
mainRoutes.use("/order", orderRoute)
mainRoutes.use("/product", productRoute)
mainRoutes.use("/orderItem", orderItemRoute)

export default mainRoutes