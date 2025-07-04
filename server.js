require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

app.use(cors()); // Allow requests from any domain or localhost

app.use(bodyParser.json());

const userRoutes = require("./routes/user-routes"); // Your user routes
const postRoutes = require("./routes/post-routes");
const checkAuth = require("./middleware/check-auth");
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(process.env.DB_STRING, {
    // Add these options if necessary
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server is running on 8000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
