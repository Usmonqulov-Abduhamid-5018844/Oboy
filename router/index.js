import { Router } from "express";
import userRoute from "./user.routes.js";
import orderRoute from "./order.routes.js";
import productRoute from "./product.routes.js";
import brandRoute from "./brand.routes.js"
import categoryRoute from "./category.routes.js"
import categoryItemRoute from "./categoryItem.routes.js"
import countryRoute from "./country.routes.js"


const mainRoutes = Router();

mainRoutes.use("/user", userRoute)
mainRoutes.use("/order", orderRoute)
mainRoutes.use("/product", productRoute)
mainRoutes.use("/brand", brandRoute)
mainRoutes.use("/category", categoryRoute)
mainRoutes.use("/categoryitem", categoryItemRoute)
mainRoutes.use("/country", countryRoute)


export default mainRoutes