import db from "../config/db.js"
import {OrderItemPatchValidation, OrderItemValidation, } from "../validations/orderItem.validation.js"

async function findAll(req, res) {
    try {

        if (Object.keys(req.query).length === 0) {
            let [order] = await db.query(`SELECT 
                    orders.id AS order_id,
                    product.id AS product_id,
                    product.nameUZ AS Product_Name_UZ,
                    product.price AS Product_Price,
                    product.descriptionUZ AS product_description_uz,
                    product.washable AS product_washable,
                    product.size AS product_size
                FROM orderItem
                    JOIN orders ON orderItem.order_id = orders.id
                    JOIN product ON orderItem.product_id = product.id;`)

                res.status(202).json({order})

        }else{

            let key = Object.keys(req.query)
            let value = Object.values(req.query)
            // let queryKey = key.map((p)=>(p += " = ?"))
            let queryKey = key.map((p)=>( "product.".concat(p += " = ?")))
            let product = []

            for (let i = 0; i < key.length; i++) {
                key[i] = key[i].toLowerCase()
                if (key[i] == "price" || key[i] == "size" || key[i] == "washable") {
                    console.log(key[i]);

                    let [prods] = await db.query(`SELECT 
                        orders.id AS order_id,
                        product.id AS product_id,
                        product.nameUZ AS Product_Name_UZ,
                        product.price AS Product_Price,
                        product.descriptionUZ AS product_description_uz,
                        product.washable AS product_washable,
                        product.size AS product_size
                    FROM orderItem
                        JOIN orders ON orderItem.order_id = orders.id
                        JOIN product ON orderItem.product_id = product.id
                        where ${queryKey.join(" AND ")}`, [...value])

                    return res.status(201).json({prods})
                }
            }
            
            if (key[0] === "page" || key[1] === "take") {
                let page = parseInt(value[0]) || 1
                let take = parseInt(value[1]) || 10
                
                let offset = (page - 1) * take

                try {
                    let [prods] = await db.query(`SELECT 
                        orders.id AS order_id,
                        product.id AS product_id,
                        product.nameUZ AS Product_Name_UZ,
                        product.price AS Product_Price,
                        product.descriptionUZ AS product_description_uz,
                        product.washable AS product_washable,
                        product.size AS product_size
                    FROM orderItem
                        JOIN orders ON orderItem.order_id = orders.id
                        JOIN product ON orderItem.product_id = product.id
                        LIMIT ? OFFSET ?`, [take, offset])

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
            orderItem.id AS order_item_id,
            orders.id AS order_id,
            product.id AS product_id,
            product.nameUZ AS Product_Name_UZ,
            product.price AS Product_Price,
            product.descriptionUZ AS product_description_uz,
            product.washable AS product_washable,
            product.size AS product_size
        FROM orderItem
        JOIN orders ON orderItem.order_id = orders.id
        JOIN product ON orderItem.product_id = product.id
        where orderitem.id = ?;`, [id])

        if (!order.length) {
            return res.status(202).json({order: "Order not found !"})       
        }
        res.status(202).json({order})
    } catch (error) {
        res.json({error: error.message})
    }
}

async function create(req, res) {
    try {
        let {error, value} = OrderItemValidation.validate(req.body)
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

        let {error, value} = OrderItemPatchValidation.validate(req.body)

        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE orderitem SET ${queryKey.join(",")} where id = ?`, [...values, id])

        console.log(result);
        
        res.status(202).json({data: "OrderItem updated"})
    } catch (error) {
        res.json({error: error.message})
    }
}

async function remove(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from orderitem where id = ?", [id])
        
        if (!user.length) {
            return res.status(401).json({error: "OrderItem not found"})
        }
        await db.query("delete from orderitem where id = ?", [id])
        
        res.status(202).json({data: "OrderItem deleted"})

    } catch (error) {
        res.json({error: error.message})
    }
}

export {findAll, findOne, create, update, remove}