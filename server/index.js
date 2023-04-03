const dbController = require("./controllers/dbController");
const userRouter = require("./routes/userRouter");
const express = require("express");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 * 60 * 5 },
    saveUninitialized: false,
  })
);

dbController.ConnectToDB();

app.use("/user", userRouter);

app.listen(4000, console.log(`Listening ${4000}`));
