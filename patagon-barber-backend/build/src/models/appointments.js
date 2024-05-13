"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDB = void 0;
const db_client_1 = require("./db_client");
class AppointmentDB {
    save(ap, clientId) {
        return db_client_1.client.execute({
            sql: 'INSERT INTO appointments (client_id,date,time) VALUES(?,?,?)',
            args: [clientId, ap.date, ap.time]
        });
    }
    getAll() {
        return db_client_1.client.execute({
            sql: 'SELECT appointments.id,date,time,name,lastname,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC',
            args: []
        });
    }
}
exports.AppointmentDB = AppointmentDB;
// export function createAppointment(ap: Appointment, clientId: number) {
//   return client.execute({
//     sql: 'INSERT INTO appointments (client_id,date,time) VALUES(?,?,?)',
//     args: [clientId, ap.date, ap.time]
//   })
// }
// export function getAppointments() {
//   return client.execute({
//     sql: 'SELECT appointments.id,date,time,name,lastname,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC',
//     args: []
//   })
// }
