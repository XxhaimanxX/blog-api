const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Route files
const posts = require("./routes/posts");

//Connect to Database
connectDB();

const app = express();

//Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { id: 1 } });
});

//Body Parser
app.use(express.json());

// Mount routers
app.use("/api/v1/posts", posts);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
