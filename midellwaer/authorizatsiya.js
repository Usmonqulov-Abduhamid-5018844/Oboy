import Jwt from "jsonwebtoken";

const authorizatsiy = (roles) => (req, res, nex)=>{
    let Toket = req.header("Authorization");
    if(!Toket){
        return res.status(404).json({message: "Not found token"});
    }
    try{
        let data = Jwt.verify(Toket, "Secret");
        if(roles.includes(data.role))
        nex();
    }catch(e){
        console.log(e);
    }
};

export default authorizatsiy