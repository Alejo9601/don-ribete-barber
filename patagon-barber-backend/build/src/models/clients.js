"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDB = void 0;
const db_client_1 = require("./db_client");
class ClientDB {
    save(clientToSave) {
        return db_client_1.client.execute({
            sql: 'INSERT INTO clients (name,lastname,email,phone_number) VALUES (?,?,?,?) RETURNING clients.id',
            args: [
                clientToSave.name,
                clientToSave.lastname,
                clientToSave.email,
                clientToSave.phone_number
            ]
        });
    }
}
exports.ClientDB = ClientDB;
