import Jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
let Secret = process.env.SECRET

const autentifikatsiya = (roles) => (req, res, next)=>{
    let Token = req.header("Authorization");
    if(!Token){
        return res.status(404).json({message: "Not found token"});
    }
    
    // try{
        let data = Jwt.verify(Token, Secret);
        // console.log(data);
        if(roles.includes(data.role)){  
            req.user = data
            next();
        }
        else{
            res.json({message: "No authoraets"})
        }
    // }catch(e){
    //     res.status(401).json({message: e.message})
    //     console.log(e.message);
    // }
};
export {autentifikatsiya};