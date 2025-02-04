import db from "../config/db.js"


async function findAll(req, res) {
    try {
        res.send("HI")
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function findOne(req, res) {
    try {
        res.send("Hello")

    } catch (error) {
        res.json({error: error.message})
    }
}

async function create(req, res) {
    try {

        let {user_id, totalPrice} = req.body

        console.log(user_id, totalPrice);
        
        let [user] = await db.query("insert into orders(user_id, totalPrice) values (?, ?)", [user_id, totalPrice])
    
        res.send({data: "Created"})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function update(req, res) {
    try {
        res.send("Salom")
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function remove(req, res) {
    try {
        res.send("Salom")
        
    } catch (error) {
        res.json({error: error.message})
    }
}

export {findAll, findOne, create, update, remove}