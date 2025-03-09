const express = require("express")
const cors = require("cors")
const { dbConnnect } = require("./src/config/dbConnect")
require("dotenv").config()
const authRoutes = require("./src/routes/authRoutes")
const userRoutes = require("./src/routes/userRoutes")
 
const app = express()
dbConnnect()





app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Backend is running!");
  });
  

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

const PORT = process.env.PORT || 5000

export default app;