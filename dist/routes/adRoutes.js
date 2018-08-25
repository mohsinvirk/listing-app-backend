"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adController_1 = require("../controllers/adController");
const multer = require("multer");
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
class Routes {
    constructor() {
        this.adController = new adController_1.adController();
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        // Ad
        app
            .route("/ads")
            .get((req, res, next) => {
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
            .get((req, res) => {
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
    }
}
exports.Routes = Routes;
//# sourceMappingURL=adRoutes.js.map