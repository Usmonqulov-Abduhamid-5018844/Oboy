import db from '../config/db.js';
import { brandPatchValidation, brandValidation } from '../validations/brand.validation.js';
import fs from "fs";

async function getAllBrands(req, res) {
    try{
        const [data] = await db.query("select * from brand");
        if(!data.length){
            return res.status(401).json({message: "brand not fount"});
        }
        
        if (Object.keys(req.query).length === 0) {
            res.status(201).json({data})
        }else{
            let keys = Object.keys(req.query)
            let value = Object.values(req.query)
    
            let queryKey = keys.map((p)=> (p += " = ?"))
            let queryValues = value.map((p)=> (p += ""))
    
            let brand = []
            for (let i = 0; i < keys.length; i++) {
    
                keys[i] = keys[i].toLowerCase()
                
                if (keys[i] === "nameUZ" || keys[i] === "nameRU" || keys[i] === "image") {
                    let [brands] = await db.query(`select * from brand where ${queryKey.join(" AND ")}`,[...queryValues])   
                    brand.push(brands)
                }
            }
    
            if (keys[0] === "page" || keys[1] === "take") {
                
                let page = parseInt(req.query.page) || 1
                let take = parseInt(req.query.take) || 10
    
                let offset = (page - 1) * take; 
    
                try {
                    let [brands] = await db.query(`SELECT * FROM brand LIMIT ? OFFSET ?`, [take, offset]);
                    return res.status(200).json({ page, take, brands });
                } catch (error) {
                    return res.status(500).json({ error: "Server xatosi" });
                }
            }
                brand = brand.flat()
                if (!brand.length) {
                    return res.status(401).json({brand: "Data not Found"})
                }
            res.status(201).json({brand})               
        }    
    }catch(e){
        res.status(401).json({message: e.message})
        console.log(e);
    }
};
async function getBrandById(req, res) {
    try {
        let {id} = req.params

        let [brand] = await db.query("select * from brand where id = ?", [id])

        if (!brand.length) {
            return res.status(202).json({brand: "brand not found !"})
            
        }
        res.status(202).json({brand})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function createBrand(req, res) {
    try {
        let image = req.file.filename
        let {error, value} = brandValidation.validate(req.body)
        if (error) {
            res.status(401).json({error: error.details[0].message})
            return
        }
        let {nameUZ, nameRU} = value

        let [data] = await db.query("insert into brand(nameUZ, nameRU, image) values (?, ?, ?)", [nameUZ, nameRU, image])
        if(data.affectedRows == 1){
            res.json({data:"Created"})
        }
        else{

            res.json({message: "Bazaga saqlashda xatolig"})
        }
    } catch (error) {
        res.json({error: error.message})
    }
}

async function updateBrand(req, res) {
    try {
        let {id} = req.params
        let {error, value} = brandPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }


        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE brand SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);
        
        res.status(202).json({data: "brand updated"})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function deleteBrand(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from brand where id = ?", [id])     
        if (!user.length) {
            return res.status(401).json({error: "brand not found"})
        }
        await db.query("delete from brand where id = ?", [id])     
        res.status(202).json({data: "brand deleted"})    
    } catch (error) {
        res.json({error: error.message})
    }
}

export { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand };
