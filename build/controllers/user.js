"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class UserController {
    get(req, res) {
        user_1.default.findById(req.params.userId, (err, user) => {
            if (err) {
                return res.json("mongoose error!!");
            }
            if (user == null) {
                return res.json("not found...");
            }
            return res.json(user);
        });
    }
    update(req, res) {
        user_1.default.findById(req.params.userId, (err, user) => {
            if (err) {
                return res.json("mongoose error!!");
            }
            if (user == null) {
                return res.json("not found...");
            }
            if (req.body.providing_destination_id !== undefined) {
                user.providing_destination_id = req.body.providing_destination_id;
                user.save();
            }
            console.log(req.body.providing_destination_id);
            return res.json(user);
        });
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=user.js.map