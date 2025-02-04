import db from "../config/db.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { totp } from "otplib";
import {registerValidation} from "../validations/user.validate.js";
import dotenv from "dotenv";
dotenv.config();
let Secret = process.env.SECRET

async function all (req,res) {
    const [data] = await db.query("select * from users");
    if(!data.length){
        return res.status(401).json({message: "Users not fount"});
    }
    res.status(200).json(data[0])
};

async function login (req,res) {
    try{
        let {phone, password} = req.body;
        const [data] = await db.query("select * from users where phone = ?", phone);

        if(!data.length){
            return res.status(401).json({message: "User not fount"});
        }
        let matchPassword = bcrypt.compareSync(password, data[0].password);
        if(!matchPassword){
            return res.status(401).json({message: "Wrong password"})
        };
        let token = Jwt.sign({
            id,
            role,
        },Secret)

        res.status(200).json({Token: token})
    }catch(e){
        console.log(e);
    }
};
async function register (req,res) {
    try{
        let {error, value} = registerValidation.validate(req.body)
        if(error){
            console.log(error);
           return res.json({message: error.message})
        };
        let {phone, password} = value;
        const [data] = await db.query("select * from users where phone = ?",phone);

        
        if(data.length){
            let OTP = totp.generate(`${phone}+${Secret}`);
            res.status(200).send({message: "sizning yangi tokeningiz", token:OTP})
            return;
        }
        if(value.role =! "user" || value.role != "admin"){
            return res.json({message: "role faqat user yoki admin bo'lishi kerak"})
        }
        let hash = bcrypt.hashSync(password, 10);
        password = hash;

        let key = Object.keys(value);
        let valuess = Object.values(value);
        let A = key.join(", ")
        let B = key.map(()=>" ?").join(", ");

        let query = `insert into users(${A}) value(${B})`
        await db.query(query, valuess);

        let OTP = totp.generate(`${phone}+${Secret}`);
        res.status(200).json({OTP});

    }catch(e){
        res.status(401).json({message: e.message});
        console.log(e);
    }
};
async function verify (req,res) {
    try{
        let {token, phone} = req.params;

        if(!token){
            return res.status(401).json({message: "Not Found token"})
        }
        let T = totp.check(token,`${phone}+${Secret}`)
        if(!T){
            return res.status(401).json({message: "Wrong Token"})
        }
        res.status(200).json({message: "Token verify"})
    }catch(e){
        console.log(e);
    }
};

export {login, register, verify, all};