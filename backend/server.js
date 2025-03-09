const express = require("express")
const cors = require("cors")
const { dbConnnect } = require("./src/config/dbConnect")
const dotenv = require("dotenv").config()
const authRoutes = require("./src/routes/authRoutes")
const userRoutes = require("./src/routes/userRoutes")

const app = express()
dbConnnect()



app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

const PORT = 3000
app.listen(PORT,() => {
    console.log("Server is running on PORT : ", PORT)
})