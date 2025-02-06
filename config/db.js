import mysql from "mysql2/promise"

const connectDB = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abduhamid",
    database: "wallpaper"
})

export default connectDB