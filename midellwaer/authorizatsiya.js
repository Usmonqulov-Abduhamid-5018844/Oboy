import Jwt from "jsonwebtoken"

const authorizatsiy = (req, res, nex)=>{
    let Toket = req.header("Authorization");
    if(!Toket){
        return res.status(404).json({message: "Not found token"});
    }
    try{
        let data = Jwt.verify(Toket, "Secret");
        req.user = data
        nex();
    }catch(e){
        res.status(401).json({message: e.message})
        console.log(e);
    }
};
export default authorizatsiy
