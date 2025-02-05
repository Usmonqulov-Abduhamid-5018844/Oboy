import db from '../config/db.js';
import path from 'path';
import { brandPatchValidation, brandValidation } from '../validations/brand.validation.js';



async function getAllBrands(req, res) {
    try {
        let [brand] = await db.query("select * from brand")

        res.status(202).json({brand})
        
    } catch (error) {
        res.json({error: error.message})
    }
}

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
        let {error, value} = brandValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let {nameUZ, nameRU, image} = value

        console.log(nameUZ, nameRU, image);    
        let [user] = await db.query("insert into brand(nameUZ, nameRU, image) values (?, ?, ?)", [nameUZ, nameRU, image])
        if(user.affectedRows == 1){
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
