const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

// Config

require("dotenv").config();

app.use(express.json());

// Route Imports
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/user", userRoutes);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;