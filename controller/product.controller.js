import db from "../config/db.js"
import {ProductPatchValidation, ProductValidation } from "../validations/product.validation.js"

async function findAll(req, res) {
    try {
        let [order] = await db.query("select * from product")

        res.status(202).json({order})     
    } catch (error) {
        res.json({error: error.message})
    }
}
async function findOne(req, res) {
    try {
        let {id} = req.params
        let [order] = await db.query("select * from product where id = ?", [id])
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