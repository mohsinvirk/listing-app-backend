"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const adRoutes_1 = require("./routes/adRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.routePrv = new adRoutes_1.Routes();
        this.userPrv = new userRoutes_1.UserRoutes();
        // public mongoUrl: string = 'mongodb://localhost/addb';
        this.mongoUrl = "mongodb://mohsin:mohsin60@ds211289.mlab.com:11289/olx";
        this.app = express();
        this.passport();
        this.config();
        this.routePrv.routes(this.app);
        this.userPrv.routes(this.app);
        this.mongoSetup();
    }
    passport() {
        this.app.use(passport.initialize());
        require("./config/passport")(passport);
    }
    config() {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // serving static files
        this.app.use("/uploads", express.static("uploads"));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose
            .connect(process.env.MONGODB_URI || this.mongoUrl)
            .then(result => {
            console.log(result);
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map