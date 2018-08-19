import * as mongoose from "mongoose";
import { AdSchema } from "../models/adModel";
import { ImageSchema } from "../models/imgModel";
import { Request, Response } from "express";
import { error } from "util";

const Ad = mongoose.model("Ad", AdSchema);
const ImageModal = mongoose.model("Image", ImageSchema);

export class adController {
  public addNewAd(req: Request, res: Response) {
    let body = req.body;
    let file = req.body.file;
    let newAd = new Ad({
      title: body.title,
      category: body.category,
      description: body.descripnption,
      price: body.price,
      address: body.Addresname,
      name: body.name,
      email: body.email,
      phone: body.phone,
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
  public addNewImage(req: Request, res: Response) {
    let file = req.file.path;
    console.log(file);

    // let newImage = new ImageModal({ file });

    // newImage
    //   .save()
    //   .then(result => {
    //     res.json(result);
    //   })
    //   .catch(err => {
    //     res.json(error);
    //   });
  }

  public getAds(req: Request, res: Response) {
    Ad.find({}, (err, ad) => {
      if (err) {
        res.send(err);
      }
      res.json(ad);
    });
  }

  public getAdWithID(req: Request, res: Response) {
    Ad.findById(req.params.adId, (err, ad) => {
      if (err) {
        res.send(err);
      }
      res.json(ad);
    });
  }

  public updateAd(req: Request, res: Response) {
    Ad.findOneAndUpdate(
      { _id: req.params.adId },
      req.body,
      { new: true },
      (err, ad) => {
        if (err) {
          res.send(err);
        }
        res.json(ad);
      }
    );
  }

  public deleteAd(req: Request, res: Response) {
    Ad.remove({ _id: req.params.adId }, (err, ad) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted Ad!", ad });
    });
  }
}
