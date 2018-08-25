"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const adModel_1 = require("../models/adModel");
const imgModel_1 = require("../models/imgModel");
const util_1 = require("util");
const Ad = mongoose.model("Ad", adModel_1.AdSchema);
const ImageModal = mongoose.model("Image", imgModel_1.ImageSchema);
class adController {
    addNewAd(req, res) {
        let body = req.body;
        let file = req.file.path;
        let newAd = new Ad({
            title: body.title,
            category: body.category,
            description: body.description,
            price: body.price,
            address: body.address,
            name: body.name,
            email: body.email,
            phone: body.phone,
            city: body.city,
            file
        });
        newAd
            .save()
            .then(result => {
            res.json(result);
        })
            .catch(err => {
            res.json(err);
        });
    }
    /**
     * addNewImage
     */
    addNewImage(req, res) {
        let file = req.file.path;
        console.log(file);
        let newImage = new ImageModal({ file });
        newImage
            .save()
            .then(result => {
            res.json(result);
        })
            .catch(err => {
            res.json(util_1.error);
        });
    }
    getAds(req, res) {
        Ad.find({}, (err, ad) => {
            if (err) {
                res.send(err);
            }
            res.json(ad);
        });
    }
    getAdWithID(req, res) {
        Ad.findById(req.params.adId, (err, ad) => {
            if (err) {
                res.send(err);
            }
            res.json(ad);
        });
    }
    updateAd(req, res) {
        Ad.findOneAndUpdate({ _id: req.params.adId }, req.body, { new: true }, (err, ad) => {
            if (err) {
                res.send(err);
            }
            res.json(ad);
        });
    }
    deleteAd(req, res) {
        Ad.remove({ _id: req.params.adId }, (err, ad) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted Ad!", ad });
        });
    }
}
exports.adController = adController;
//# sourceMappingURL=adController.js.map