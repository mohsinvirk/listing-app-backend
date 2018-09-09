"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.userController = new userController_1.userController();
    }
    routes(app) {
        app.route("/users").get((req, res) => {
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
        // POST endpoint of token
        app
            .route("/settoken")
            .post(this.userController.setToken)
            .get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map