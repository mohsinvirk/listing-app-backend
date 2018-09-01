import { Request, Response, NextFunction } from "express";
import { adController } from "../controllers/adController";
import { messageController } from "../controllers/messageController";
import * as multer from "multer";

const path = require("path");

// multer configuration
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

var upload = multer({
  storage
});

export class Routes {
  public adController: adController = new adController();
  public messageController: messageController = new messageController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });

    // Ad

    app
      .route("/ads")
      .get((req: Request, res: Response, next: NextFunction) => {
        // middleware

        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      }, this.adController.getAds)

      // POST endpoint

      .post(upload.single("file"), this.adController.addNewAd);

    // Image endpoint

    app
      .route("/ads/images")
      .post(this.adController.addNewImage)
      .get((req: Request, res: Response) => {
        res.send({
          message: "API is Working "
        });
      });

    // Ad detail

    app
      .route("/ads/:adId")
      // get specific Ad

      .get(this.adController.getAdWithID)
      .put(this.adController.updateAd)
      .delete(this.adController.deleteAd);

    app
      .route("/ads/send")
      .post(this.messageController.addNewMessage)
      .get((req: Request, res: Response) => {
        res.send({
          message: "API is Working "
        });
      });
  }
}
