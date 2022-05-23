const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());

const user = require("./routes/userRoute");
const book = require("./routes/bookRoute");

app.use("/api/v1",user);
app.use("/api/v1",book);

// Middleware for error
app.use(errorMiddleware);



module.exports = app