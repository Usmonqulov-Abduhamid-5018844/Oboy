import {create, findAll, findOne, remove, update} from "../controller/orderItem.controller.js"
import {Router} from "express"

let route = Router()

route.get("", findAll)
route.get("/:id", findOne)
route.post("", create)
route.patch("/:id", update)
route.delete("/:id", remove)

export default route