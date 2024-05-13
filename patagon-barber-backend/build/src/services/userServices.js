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
exports.validateUserPassword = exports.getUser = void 0;
const db_client_1 = require("../models/db_client");
function normalizeUser(response) {
    let user;
    if (response.rows.length === 0) {
        user = {
            id: -1,
            name: '',
            lastname: '',
            username: '',
            password: '',
            rol: ''
        };
    }
    else {
        user = {
            id: response.rows[0].id,
            name: response.rows[0].name,
            lastname: response.rows[0].lastname,
            username: response.rows[0].username,
            password: response.rows[0].password,
            rol: response.rows[0].rol
        };
    }
    return user;
}
function getUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_client_1.client
            .execute({
            sql: `SELECT * FROM users WHERE users.username = "${username}"`,
            args: []
        })
            .then((response) => normalizeUser(response))
            .then((user) => (validateUserPassword(user, password) ? user : null));
    });
}
exports.getUser = getUser;
function validateUserPassword(user, password) {
    return user.id !== -1 && user.password === password;
}
exports.validateUserPassword = validateUserPassword;
