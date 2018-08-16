import * as mongoose from "mongoose";
import { AdSchema } from "../models/adModel";
import { Request, Response } from "express";

const Ad = mongoose.model("Ad", AdSchema);

export class adController {
  public addNewAd(req: Request, res: Response) {
    let body = req.body;
    let newAd = new Ad({
      title: body.title,
      category: body.category,
      description: body.descripnption,
      price: body.price,
      address: body.Addresname,
      name: body.name,
      email: body.email,
      phone: body.phone,
      file: req.files
    });

    newAd.save((err, ad) => {
      if (err) {
        res.send(err);
      }
      res.json({ ad, file: newAd.file });
    });
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
