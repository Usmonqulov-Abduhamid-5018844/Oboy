import db from "../config/db.js"
import {OrderPatchValidation, OrderValidation, } from "../validations/order.validate.js"

async function findAll(req, res) {
    try {

        if (Object.keys(req.query).length === 0) {
            let [order] = await db.query(`SELECT 
                orders.id AS order_id,
                orders.user_id AS User_id,
                users.fullName AS User_name,
                product.nameUZ AS product_name,
                orders.totalPrice AS Total_Price,
                orderItem.count,
                orderItem.total
            FROM orders
            JOIN users ON orders.user_id = users.id
            LEFT JOIN orderItem ON orders.id = orderItem.order_id
            LEFT JOIN product ON orderItem.product_id = product.id;`)

            res.status(202).json({order})

        }else{

            let key = Object.keys(req.query)
            let value = Object.values(req.query)
            // let queryKey = key.map((p)=>(p += " = ?"))
            let queryKey = key.map((p)=>( "orders.".concat(p += " = ?")))
            let product = []

            for (let i = 0; i < key.length; i++) {
                
                key[i] = key[i].toLowerCase()
                if (key[i] == "user_id" || key[i] == "totalprice") {
                    console.log(key[i]);

                    let [prods] = await db.query(`SELECT 
                        orders.id AS order_id,
                        orders.user_id AS User_id,
                        users.fullName AS User_name,
                        product.nameUZ AS product_name,
                        orders.totalPrice AS Total_Price,
                        orderItem.count,
                        orderItem.total
                    FROM orders
                    JOIN users ON orders.user_id = users.id
                    LEFT JOIN orderItem ON orders.id = orderItem.order_id
                    LEFT JOIN product ON orderItem.product_id = product.id
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
                        orders.user_id AS User_id,
                        users.fullName AS User_name,
                        product.nameUZ AS product_name,
                        orders.totalPrice AS Total_Price,
                        orderItem.count,
                        orderItem.total
                    FROM orders
                    JOIN users ON orders.user_id = users.id
                    JOIN orderItem ON orders.id = orderItem.order_id
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
        console.log("user_id, totalPrice");
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