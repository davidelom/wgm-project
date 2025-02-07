require("dotenv").config();
const db = require("./configs/db");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", async (req, res) => {
    const result = await db.query("SELECT current_database()");
    res.send(`The current database is: ${result.rows[0].current_database}`);
});

// Error handler

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
