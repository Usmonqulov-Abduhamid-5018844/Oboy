import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let Secret = process.env.SECRET

const autentifikatsiya = (roles) => (req, res, next) => {
    let authHeader = req.header("Authorization");
    
    if (!authHeader) {
        return res.status(401).json({token: "Not found token"})
    }
    console.log(authHeader);
    
    try {
        let data = Jwt.verify(token, Secret);
        if (roles.includes(data.role)) {  
            req.user = data;
            next();
        } else {
            res.status(403).json({ message: "Unauthorized access" });
        }
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
        console.log("Verification Error:", e.message);
    }
};

export { autentifikatsiya };
