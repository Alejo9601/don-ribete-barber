"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentServices_1 = require("../services/appointmentServices");
const appointmentRouter = express_1.default.Router();
appointmentRouter.get('/', (req, res) => {
    (0, appointmentServices_1.getAllAppointments)().then((appointments) => res.send(appointments));
});
appointmentRouter.post('/', (req, res) => {
    const appointmentData = req.body;
    (0, appointmentServices_1.setAppointment)(appointmentData).then((appointment) => res.send(appointment));
});
exports.default = appointmentRouter;
