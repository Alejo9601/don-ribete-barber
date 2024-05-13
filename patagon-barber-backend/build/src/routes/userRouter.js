"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices_1 = require("../services/userServices");
const userRouter = express_1.default.Router();
userRouter.get('/', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const encodedCredentials = auth.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');
    (0, userServices_1.getUser)(username, password).then((user) => {
        if (user === null) {
            return res.status(404).send({ error: 'Username or Password incorrect' });
        }
        res.send(user);
    });
});
exports.default = userRouter;
