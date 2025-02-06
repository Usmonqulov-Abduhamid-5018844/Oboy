import db from "../config/db.js"
import {ProductPatchValidation, ProductValidation } from "../validations/product.validation.js"

async function findAll(req, res) {
    try {        
        // console.log(Object.keys(req.query).length);

        if (Object.keys(req.query).length === 0) {
            let [order] = await db.query(`SELECT 
                    brand.id AS brand_id,
                    country.id AS country_id,
                    product.*
                FROM product
                JOIN brand ON product.brand_id = brand.id
                JOIN country ON product.country_id = country.id;`)

            return res.status(202).json({order}) 
        }else{

            let key = Object.keys(req.query)
            let value = Object.values(req.query)

            let queryKey = key.map((p)=>(p += " = ?"))

            let product = []
            
            for (let i = 0; i < key.length; i++) {
                
                key[i] = key[i].toLowerCase()
                if (key[i] == "brand_id" || key[i] == "country_id"|| key[i] == "available" || key[i] == "washable" || key[i] == "size" || key[i] == "price" || key[i] == "oldpirce") {
                    console.log(key[i]);

                    let [prods] = await db.query(`select * from product where ${queryKey.join(" AND ")}`, [...value])
                    return res.status(201).json({prods})
                }
            }
            
            if (key[0] === "page" || key[1] === "take") {
                let page = parseInt(value[0]) || 1
                let take = parseInt(value[1]) || 10
                
                let offset = (page - 1) * take

                try {
                    let [prods] = await db.query("select * from product LIMIT ? OFFSET ?", [take, offset])
                    console.log(prods);

                    return res.status(200).json({page, take, prods})
                } catch (error) {
                    res.status(500).json({error: "Server xatosi"})
                }
            }
        }
        
    } catch (error) {
        res.json({error: error.message})
    }
}
async function findOne(req, res) {
    try {
        let {id} = req.params
        let [order] = await db.query(`SELECT 
            product.id AS product_id,
            brand.id AS brand_id,
            country.id AS country_id,
            product.*
        FROM product
        JOIN brand ON product.brand_id = brand.id
        JOIN country ON product.country_id = country.id
        where product.id = ?;`, [id])

        if (!order.length) {
            return res.status(202).json({order: "Product not found !"})         
        }
        res.status(202).json({order})
    } catch (error) {
        res.json({error: error.message})
    }
}
async function create(req, res) {
    try {
        let {error, value} = ProductValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let key = Object.keys(value);
        let valuess = Object.values(value);
        let A = key.join(", ")
        let B = key.map(()=>" ?").join(", ");

        let query = `insert into product(${A}) value(${B})`
        let [D] = await db.query(query, valuess);
        if(D.affectedRows == 1){
            res.json({data: "Created"})
        }
        else{
            res.json({message: "Bazaga malumot saqlashda hatolog"})
        }
    } catch (error) {
        res.json({error: error.message})
    }
}
async function update(req, res) {
    try {
        let {id} = req.params

        let {error, value} = ProductPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE product SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);    
        res.status(202).json({data: "Order updated"})
    } catch (error) {
        res.json({error: error.message})
    }
}
async function remove(req, res) {
    try {
        let {id} = req.params
        let [user] = await db.query("select * from product where id = ?", [id])    
        if (!user.length) {
            return res.status(401).json({error: "User not found"})
        }
        await db.query("delete from orders where id = ?", [id])      
        res.status(202).json({data: "Order deleted"})     
    } catch (error) {
        res.json({error: error.message})
    }
}
export {findAll, findOne, create, update, remove}