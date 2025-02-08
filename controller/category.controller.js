import db from '../config/db.js';
import { categoryPatchValidation, categoryValidation } from '../validations/category.validation.js';

async function getAllCategories(req, res) {
    try{
        const [data] = await db.query("select * from category");
        if(!data.length){
            return res.status(401).json({message: "category not fount"});
        }
        
        if (Object.keys(req.query).length === 0) {
            res.status(201).json({data})
        }else{
            let keys = Object.keys(req.query)
            let value = Object.values(req.query)
    
            let queryKey = keys.map((p)=> (p += " = ?"))
            let queryValues = value.map((p)=> (p += ""))
    
            let category = []
            for (let i = 0; i < keys.length; i++) {
    
                keys[i] = keys[i].toLowerCase()
                
                if (keys[i] === "nameUZ" || keys[i] === "nameRU" || keys[i] === "image") {
                    let [categorys] = await db.query(`select * from category where ${queryKey.join(" AND ")}`,[...queryValues])   
                    category.push(categorys)
                }
            }
    
            if (keys[0] === "page" || keys[1] === "take") {
                
                let page = parseInt(req.query.page) || 1
                let take = parseInt(req.query.take) || 10
    
                let offset = (page - 1) * take; 
    
                try {
                    let [categorys] = await db.query(`SELECT * FROM category LIMIT ? OFFSET ?`, [take, offset]);
                    return res.status(200).json({ page, take, categorys });
                } catch (error) {
                    return res.status(500).json({ error: "Server xatosi" });
                }
            }
            category = category.flat()
                if (!category.length) {
                    return res.status(401).json({category: "Data not Found"})
                }
            res.status(201).json({category})               
        }    
    }catch(e){
        res.status(401).json({message: e.message})
        console.log(e);
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
        let {nameUZ, nameRU, image, categriy_id} = value
        let images = req.file ? { filename: req.file.filename } : { filename: image };

        let [category] = await db.query("insert into category(nameUZ, nameRU, image) values (?, ?, ?)", [nameUZ, nameRU, image])

        console.log(category);
        
        categriy_id.forEach(async element => {
            let [categoryItem] = await db.query("insert into categoryitem(category_id, product_id) values (?, ?)", [category.insertId, element.product_id])

        });
        if(category.affectedRows == 1){
            return res.json({data:"Created"})
        }
        else{
            return res.json({message: "Bazaga saqlashda xatolig"})
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
