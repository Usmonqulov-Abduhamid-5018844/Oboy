import {Router} from "express";
import { all, login, register, verify } from "../controller/user.controller.js";
import authorizatsiy from "../midellwaer/authorizatsiya.js";

const userRoute = Router()

userRoute.get("/all", all);
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.post("/verify/:token/:phone", verify);


export default userRoute