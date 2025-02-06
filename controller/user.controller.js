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
    

    if (Object.keys(req.query).length === 0) {
        res.status(201).json({data})
    }else{
        let keys = Object.keys(req.query)
        let value = Object.values(req.query)

        let queryKey = keys.map((p)=> (p += " = ?"))
        let queryValues = value.map((p)=> (p += ""))

        let user = []
        for (let i = 0; i < keys.length; i++) {

            keys[i] = keys[i].toLowerCase()
            
            if (keys[i] === "fullname" || keys[i] === "phone" || keys[i] === "role") {
                let [users] = await db.query(`select * from users where ${queryKey.join(" AND ")}`,[...queryValues])   
                user.push(users)
            }
        }

        if (keys[0] === "page" || keys[1] === "take") {
            
            let page = parseInt(req.query.page) || 1
            let take = parseInt(req.query.take) || 10

            let offset = (page - 1) * take; 

            try {
                let [users] = await db.query(`SELECT * FROM users LIMIT ? OFFSET ?`, [take, offset]);
                return res.status(200).json({ page, take, users });
            } catch (error) {
                return res.status(500).json({ error: "Server xatosi" });
            }
        }

            user = user.flat()
            if (!user.length) {
                return res.status(401).json({user: "Data not Found"})
            }

            res.status(201).json({user})
                
    }
    

    
};

async function login (req,res) {
    try{
        let {phone, password} = req.body;
        const [data] = await db.query("select * from users where phone = ?", phone);

        if(!data.length){
            return res.status(401).json({message: "User not fount"});
        }
        console.log(data[0].password);
        console.log(password);
        let matchPassword = bcrypt.compareSync(password, data[0].password);
        if(!matchPassword){
                return res.status(401).json({message: "Wrong password"})
            };
            let token = Jwt.sign({
                id: data[0].id,
                role: data[0].role,
            },Secret)
            // console.log(token);

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
        if(!value.role == "user" || !value.role == "admin"){
            return res.json({message: "role faqat user yoki admin bo'lishi kerak"})
        }
        let hash = bcrypt.hashSync(password, 10);
        value.password = hash;

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
        let {otp, phone} = req.body;
        
        if(!otp){
            return res.status(401).json({message: "Not Found otp"})
        }
        let T = totp.check(otp,`${phone}+${Secret}`)
        if(!T){
            return res.status(401).json({message: "Wrong OTP"})
        }
        res.status(200).json({message: "OTP verify"})
    }catch(e){
        console.log(e);
    }
};

export {login, register, verify, all};