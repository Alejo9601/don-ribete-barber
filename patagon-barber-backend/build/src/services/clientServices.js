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
exports.createClient = void 0;
const clients_1 = require("../models/clients");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeClient(clientData) {
    const client = {
        id: undefined,
        name: clientData.name,
        lastname: clientData.lastname,
        email: clientData.email,
        phone_number: clientData.phone_number
    };
    return client;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createClient(clientData) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientToSave = normalizeClient(clientData);
        const clientDB = new clients_1.ClientDB();
        try {
            const savedClientId = Number((yield clientDB.save(clientToSave)).rows[0].id);
            return savedClientId;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createClient = createClient;
