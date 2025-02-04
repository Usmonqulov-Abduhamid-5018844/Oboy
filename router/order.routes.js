import {create, findAll, findOne, remove, update} from "../controller/order.controller.js"
import {Router} from "express"
import authorizatsiy from "../middlewares/authorizatsiya.js";

let route = Router();

route.get("", findAll)
route.get("/:id", findOne)
route.post("",authorizatsiy(["admin"]), create)
route.patch("/:id",authorizatsiy(["admin"]), update)
route.delete("/:id",authorizatsiy(["admin"]), remove)

export default route