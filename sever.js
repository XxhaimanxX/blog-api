const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Body Parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
