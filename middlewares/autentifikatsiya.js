import Jwt from "jsonwebtoken";

const autentifikatsiya = (roles) => (req, res, next) => {
    let authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No Found token"});
    }

    const token = authHeader.split(" ")[1];

    try {
        let data = Jwt.verify(token, "Secret");
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
