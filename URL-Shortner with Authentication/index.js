const express = require("express");

const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser")
const {handleLoggedInUserOnly, checkAuth } = require("./middlewares/auth")
//routes
const staticRoutes = require("./routes/staticRoutes");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDb("mongodb://localhost:27017/shortUrl").then(() =>
  console.log("Mongodb Connected!"),
);

app.use("/url",handleLoggedInUserOnly, urlRoute);
app.use("/",checkAuth, staticRoutes);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started a PORT: ${PORT}`));
