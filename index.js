const express = require("express")
const { connectToDb } = require("./utils/databaseUtils")
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express()
app.use(express.json())

connectToDb()

app.use("/todos", todoRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});