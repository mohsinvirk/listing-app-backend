import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import { Routes } from "./routes/adRoutes";
import { UserRoutes } from "./routes/userRoutes";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public userPrv: UserRoutes = new UserRoutes();
  // public mongoUrl: string = 'mongodb://localhost/addb';
  public mongoUrl: string = "mongodb://localhost:27017/OLX";

  constructor() {
    this.app = express();
    this.passport();
    this.cors();
    this.config();
    this.routePrv.routes(this.app);
    this.userPrv.routes(this.app);
    this.mongoSetup();
  }

  private passport(): void {
    this.app.use(passport.initialize());
    require("./config/passport")(passport);
  }

  private cors(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // serving static files
    this.app.use(express.static("public"));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
