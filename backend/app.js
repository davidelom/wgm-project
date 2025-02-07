require("dotenv").config();
const db = require("./config/db");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const playerRoute = require("./routes/player-route");
const errorHandler = require("./middlewares/errorHandler");
const { initDB } = require("./data/init-db");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/players", playerRoute);

// Create DB Tables before starting the server
initDB();

// DB Connection Test
app.get("/", async (req, res) => {
    const result = await db.query("SELECT current_database()");
    res.send(`The current database is: ${result.rows[0].current_database}`);
});

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
