import db from '../config/db.js';
import path from 'path';
import { categoryPatchValidation, categoryValidation } from '../validations/category.validation.js';



async function getAllCategories(req, res) {
    try {
        let [category] = await db.query("select * from category")

        res.status(202).json({category})
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function getCategoryById(req, res) {
    try {
        let {id} = req.params

        let [category] = await db.query("select * from category where id = ?", [id])

        if (!category.length) {
            return res.status(202).json({category: "category not found !"})
            
        }
        res.status(202).json({category})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function createCategory(req, res) {
    try {
        let {error, value} = categoryValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let {nameUZ, nameRU, image} = value

        console.log(nameUZ, nameRU, image);    
        let [user] = await db.query("insert into category(nameUZ, nameRU, image) values (?, ?, ?)", [nameUZ, nameRU, image])
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

async function updateCategory(req, res) {
    try {
        let {id} = req.params
        let {error, value} = categoryPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }


        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE category SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);
        
        res.status(202).json({data: "category updated"})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function deleteCategory(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from category where id = ?", [id])     
        if (!user.length) {
            return res.status(401).json({error: "category not found"})
        }
        await db.query("delete from category where id = ?", [id])     
        res.status(202).json({data: "category deleted"})    
    } catch (error) {
        res.json({error: error.message})
    }
}

export { createCategory,deleteCategory,getAllCategories,getCategoryById, updateCategory };
