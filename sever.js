const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Route files
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const auth = require("./routes/auth");
const users = require("./routes/users");

//Connect to Database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { id: 1 } });
});

//Body Parser
app.use(express.json());

// Mount routers
app.use("/api/v1/posts", posts);
app.use("/api/v1/comments", comments);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
