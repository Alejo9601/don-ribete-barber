"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentServices_1 = require("../services/appointmentServices");
const appointmentsRouter = express_1.default.Router();
appointmentsRouter.get('/', (req, res) => {
    (0, appointmentServices_1.getAllAppointments)().then((appointments) => res.send(appointments.rows));
});
exports.default = appointmentsRouter;
