import * as mongoose from "mongoose";
import * as gravatar from "gravatar";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserSchema } from "../models/userModel";
import { Request, Response } from "express";

const User = mongoose.model("User", UserSchema);

export class userController {
  public addNewUser(req: Request, res: Response) {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already Exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: 200, //Size,
          r: "pg", //Rating
          d: "mm" //Default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
  public loginUser(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    // Find user in db
    User.findOne({ email }).then(user => {
      // If User exists
      if (!user) {
        return res.status(404).json({ email: "user not found" });
      }
      // Compare the hashed user.password with password
      bcrypt.compare(password, user.password).then(isMatch => {
        // If password Match successful
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          };
          // Sign Token
          jwt.sign(
            payload,
            "PanacloudBootCamp",
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                sucess: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(404).json({ erro: "Not found" });
        }
      });
    });
  }
}
