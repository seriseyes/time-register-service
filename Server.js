//Import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const https = require('https');
const fs = require("fs");
const log = require("./utils/Log");

//Import routes
const authRoute = require("./routes/AuthRoute");
const attendeeRoute = require("./routes/AttendeeRoute");
const userRoute = require("./routes/UserRoute");

require("dotenv").config();

const privateKey = fs.readFileSync(process.env.MAIN_PATH + "/medsoft.pem");
const certificate = fs.readFileSync(process.env.MAIN_PATH + "/medsoft.crt");

//Initializes
const app = express();
const server = https.createServer({key: privateKey, cert: certificate}, app);
const PORT = process.env.PORT || 80;//Backend PORT

//Middlewares
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(process.env.MAIN_PATH + "/software"));
app.use(express.static(path.join(__dirname, "../time-register/build/")));

//Mongo холболт
mongoose.connect("mongodb://localhost/timeRegister",
    () => {
        log.info("Mongoose Connected Successfully");
    }, e => log.error(e));

//Routes
app.use("/auth", authRoute);
app.use("/attendee", attendeeRoute);
app.use("/user", userRoute);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../time-register/build/index.html"));
});

//Эхлэл
server.listen(PORT, () => {
    log.info(`
░█▀▀▀█ ░█▀▀▀ ░█▀▀█ ░█──░█ ░█▀▀▀ ░█▀▀█ 　 ░█▀▀▀█ ▀▀█▀▀ ─█▀▀█ ░█▀▀█ ▀▀█▀▀ ░█▀▀▀ ░█▀▀▄ 
─▀▀▀▄▄ ░█▀▀▀ ░█▄▄▀ ─░█░█─ ░█▀▀▀ ░█▄▄▀ 　 ─▀▀▀▄▄ ─░█── ░█▄▄█ ░█▄▄▀ ─░█── ░█▀▀▀ ░█─░█ 
░█▄▄▄█ ░█▄▄▄ ░█─░█ ──▀▄▀─ ░█▄▄▄ ░█─░█ 　 ░█▄▄▄█ ─░█── ░█─░█ ░█─░█ ─░█── ░█▄▄▄ ░█▄▄▀`);
    log.info("PORT: " + PORT);
});

/**
 * Баярхүү.Лув, 2022.06.30
 */