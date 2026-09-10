const express = require("express");

const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser")
const {checkForAuthorization, restrictTo } = require("./middlewares/auth")
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
app.use(checkForAuthorization)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDb("mongodb://localhost:27017/shortUrl").then(() =>
  console.log("Mongodb Connected!"),
);

app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/", staticRoutes);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started a PORT: ${PORT}`));
