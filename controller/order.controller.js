import db from "../config/db.js"
import {OrderPatchValidation, OrderValidation, } from "../validations/order.validate.js"

async function findAll(req, res) {
    try {
        let [order] = await db.query(`SELECT 
        orders.id AS order_id,
        users.fullName AS name,
        product.nameUZ AS product_name,
        orderItem.count,
        orderItem.total
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN orderItem ON orders.id = orderItem.order_id
    JOIN product ON orderItem.product_id = product.id;`)

        res.status(202).json({order})
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function findOne(req, res) {
    try {
        let {id} = req.params

        let [order] = await db.query(`SELECT 
            orders.id AS orders_id,
            orders.id AS order_id,
            users.fullName AS name,
            product.nameUZ AS product_name,
            orderItem.count,
            orderItem.total
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN orderItem ON orders.id = orderItem.order_id
        JOIN product ON orderItem.product_id = product.id
        where orders.id = ?;`, [id])

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
        let {error, value} = OrderValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let {user_id, totalPrice} = value

        console.log(user_id, totalPrice);    
        let [user] = await db.query("insert into orders(user_id, totalPrice) values (?, ?)", [user_id, totalPrice])
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
async function update(req, res) {
    try {
        let {id} = req.params
        let {error, value} = OrderPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE orders SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);
        
        res.status(202).json({data: "Order updated"})

    } catch (error) {
        res.json({error: error.message})
    }
}
async function remove(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from orders where id = ?", [id])     
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