import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as cors from "cors";
import { Routes } from "./routes/adRoutes";
import { UserRoutes } from "./routes/userRoutes";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public userPrv: UserRoutes = new UserRoutes();
  // public mongoUrl: string = 'mongodb://localhost/addb';
  public mongoUrl: string =
    "mongodb://mohsin:mohsin60@ds211289.mlab.com:11289/olx";

  constructor() {
    this.app = express();
    this.passport();
    this.config();
    this.routePrv.routes(this.app);
    this.userPrv.routes(this.app);
    this.mongoSetup();
  }

  private passport(): void {
    this.app.use(passport.initialize());
    require("./config/passport")(passport);
  }

  private config(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST,PUT, DELETE, OPTIONS"
      );
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // serving static files
    this.app.use("/uploads", express.static("uploads"));
  }

  private mongoSetup(): void {
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

export default new App().app;
