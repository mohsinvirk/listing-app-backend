import * as mongoose from "mongoose";
import { messageSchema } from "../models/messageModel";
import { UserSchema } from "../models/userModel";
import { Request, Response } from "express";
import * as FCM from "fcm-node";
let serverKey =
  "AAAAgJzBXCY:APA91bEQjf7-125W_aG50XUOpVmiahpjSuEqQkhFuSmKexA8yMFiNNdhSICVsZyvlGI_wqOWCNC4tlYKCZQbtfdKszjjNnA0Yq5RRmXj4QBS4YiNoT2IH3mtoyDjm9rCygEhIbX4ZyoL";
// import { error } from "util";

const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", UserSchema);

export class messageController {
  /**
   * addNewImage
   */
  public addNewMessage(req: Request, res: Response) {
    let body = req.body;
    User.findOne({ email: req.body.adAuthor }, (user, err) => {
      if (err) res.json(err);
      var fcm = new FCM(serverKey);
      let token = user.fcmtoken;
      let message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: `${token}`,
        collapse_key: "your_collapse_key",

        notification: {
          title: `Hi ${body.senderName}`,
          body: body.senderMessage
        },

        data: {
          //you can send only notification or only data(or include both)
          my_key: "my value",
          my_another_key: "my another value"
        }
      };
      fcm.send(message, function(err, response) {
        if (err) {
          console.log(err);
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });

      let newMessage = new Message({
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        senderMessage: body.senderMessage
      });
      newMessage
        .save()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    });
  }
}
