import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as methodOverride from "method-override";
import * as path from "path";

// router
import router from "./router";

const app = express();

//// 1. mongoose connection
var mongoose = require('mongoose');  // mongoose 利用
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/nellow', {useMongoClient: true}); // 接続

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//// end 1

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb"
  })
);
app.use(methodOverride());
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "../public"), {
  maxAge: process.env.NODE_ENV === "production" ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60
}))
app.use(router);

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";
app.listen(parseInt(PORT, 10), HOST, () => {
  console.log.apply(console, [`NODE_ENV: ${process.env.NODE_ENV}`])
  console.log.apply(console, [`Listen: http://${HOST}:${PORT}`])
})
