import mysql from "mysql2/promise"

const connectDB = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "prayekt"
})

export default connectDB