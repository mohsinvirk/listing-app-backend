import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import { userController } from "../controllers/userController";

export class UserRoutes {
  public userController: userController = new userController();

  public routes(app): void {
    app.route("/users").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });
    app.route("/users/register").post(this.userController.addNewUser);

    app.route("/users/login").post(this.userController.loginUser);

    app
      .route("/users/current")
      .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          avatar: req.user.avatar
        });
      });

    // POST endpoint

    // Ad detail
    // app
    //   .route("/ads/:adId")
    //   // get specific Ad
    //   .get(this.userController.getAdWithID)
    //   .put(this.userController.updateAd)
    //   .delete(this.userController.deleteAd);
  }
}
