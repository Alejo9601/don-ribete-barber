"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppointment = exports.getAllAppointments = void 0;
const appointments_1 = require("../models/appointments");
const clientServices_1 = require("./clientServices");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAppointment(appointmentData) {
    const appointment = {
        id: appointmentData.id,
        client: undefined,
        date: appointmentData.date,
        time: appointmentData.time,
        service: { id: 1, name: 'cut', price: '10', appointment: undefined }
    };
    return appointment;
}
function getAllAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        const appDB = new appointments_1.AppointmentDB();
        try {
            const result = yield appDB.getAll();
            return result.rows;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllAppointments = getAllAppointments;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setAppointment(appointmentData) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientToSave = appointmentData.client;
        const savedClientId = yield (0, clientServices_1.createClient)(clientToSave);
        const appointment = normalizeAppointment(appointmentData);
        const appDB = new appointments_1.AppointmentDB();
        try {
            if (savedClientId === undefined)
                throw new Error('Something gone wrong saving appointment');
            const result = yield appDB.save(appointment, savedClientId);
            console.log(result.rows);
            return result.rows;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.setAppointment = setAppointment;
