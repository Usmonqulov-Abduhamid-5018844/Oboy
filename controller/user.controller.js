import db from "../config/db.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { totp } from "otplib";

async function all (req,res) {
    const [data] = await db.query("select * from users");
    if(!data.length){
        return res.status(401).json({message: "Users not fount"});
    }
    res.status(200).json(data[0])
}
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
        let {id, role}= data[0];
        let payload = {
            id,
            role
        };
        let token = accessToken(payload);

        res.status(200).json({accessToken: token})
    }catch(e){
        console.log(e);
    }
};
async function register (req,res) {
    try{
        let items = req.body;
        const [data] = await db.query("select * from users where phone = ?", items.phone);

        console.log(data);
        

        if(data.length){
            let OTP = totp.generate(`${items.phone}+ "Secret"`);
            res.status(200).send({Yangi_token: OTP});
            return
            
        }
        let hash = bcrypt.hashSync(items.password, 10);
        items.password = hash;

        let key = Object.keys(items);
        let valuess = Object.values(items);
        let A = key.join(", ")
        let B = key.map(()=>" ?").join(", ");

        let query = `insert into users(${A}) value(${B})`
        await db.query(query, valuess);

        let OTP = totp.generate(`${items.phone}+ "Secret"`);
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
        let T = totp.check(token,`${phone}+ "Secret`)
        console.log(T);
        if(!T){
            return res.status(401).json({message: "Wrong Token"})
        }
        res.status(202).json({message: T})
        
    }catch(e){
        console.log(e);
    }
};
async function accessToken (payload) {
    return Jwt.sign(payload, "Secret")
}

export {login, register, verify, all};
