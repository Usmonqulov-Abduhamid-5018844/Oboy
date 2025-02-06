import db from '../config/db.js';
import { categoryitemPatchValidation, categoryitemValidation } from '../validations/categoryitem.validation.js';

async function getAllCategoryItems(req, res) {
    try {
        let [order] = await db.query(`SELECT 
            product.id AS brand_id,
            category.id AS country_id,
            categoryItem.*
        FROM categoryItem
        JOIN product ON categoryItem.product_id = product_id
        JOIN category ON categoryItem.category_id = category.id;`)

        res.status(202).json({categoryitem})
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function getCategoryItemById(req, res) {
    try {
        let {id} = req.params

        let [order] = await db.query(`SELECT 
            categoryItem.id AS categoryItem_id,
            product.id AS brand_id,
            category.id AS country_id,
            categoryItem.*
        FROM categoryItem
        JOIN product ON categoryItem.product_id = product_id
        JOIN category ON categoryItem.category_id = category.id
        WHERE categoryItem.id = ?;`, [id])

        if (!categoryitem.length) {
            return res.status(202).json({categoryitem: "categoryitem not found !"})
            
        }
        res.status(202).json({categoryitem})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function createCategoryItem(req, res) {
    try {
        let {error, value} = categoryitemValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let {category_id, product_id} = value

        console.log(category_id, product_id);    
        let [user] = await db.query("insert into categoryitem(category_id, product_id) values (?, ?, ?)", [category_id, product_id])
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

async function updateCategoryItem(req, res) {
    try {
        let {id} = req.params
        let {error, value} = categoryitemPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }


        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE categoryitem SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);
        
        res.status(202).json({data: "categoryitem updated"})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function deleteCategoryItem(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from categoryitem where id = ?", [id])     
        if (!user.length) {
            return res.status(401).json({error: "categoryitem not found"})
        }
        await db.query("delete from categoryitem where id = ?", [id])     
        res.status(202).json({data: "categoryitem deleted"})    
    } catch (error) {
        res.json({error: error.message})
    }
}

export { createCategoryItem,deleteCategoryItem,getAllCategoryItems,getCategoryItemById,updateCategoryItem };
