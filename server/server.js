const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectedDB = require("./DB/connect");
const postRoutes = require("./routes/postRoute");
const authRoutes = require("./routes/authRoutes");
connectedDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

module.exports = app