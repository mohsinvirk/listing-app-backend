import * as mongoose from "mongoose";
import { messageSchema } from "../models/messageModel";
import { UserSchema } from "../models/userModel";
import { Request, Response } from "express";
import * as FCM from "fcm-node";
let serverKey =
  "AAAAgJzBXCY:APA91bEQjf7-125W_aG50XUOpVmiahpjSuEqQkhFuSmKexA8yMFiNNdhSICVsZyvlGI_wqOWCNC4tlYKCZQbtfdKszjjNnA0Yq5RRmXj4QBS4YiNoT2IH3mtoyDjm9rCygEhIbX4ZyoL";
// import { error } from "util";

const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", UserSchema, "user");

export class messageController {
  /**
   * addNewImage
   */
  public addNewMessage(req: Request, res: Response) {
    let body = req.body;
    let email = req.body.adAuthor;
    User.findOne({ email })
      .then(user => {
        var fcm = new FCM(serverKey);
        let message = {
          //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: `${user.fcmtoken}`,
          collapse_key: "your_collapse_key",

          notification: {
            title: `Hi ${user.name}`,
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
        console.log("User", user);
      })
      .catch(err => {
        if (err) res.send(err);
      });
    let newMessage = new Message({
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderMessage: body.senderMessage
    });
    newMessage
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        res.json(err);
      });
  }
}
