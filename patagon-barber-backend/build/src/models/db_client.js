"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@libsql/client");
exports.client = (0, client_1.createClient)({
    url: 'libsql://patagon-barber-alejo9601.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTQ2ODY1ODksImlkIjoiNTExM2M1MTItNjM1ZC00NDdlLWE5YmQtNzYxZjEwYWU0MTgwIn0.2RYObSMC0cpp4Q45-8b4NnBZZDj8BMa8YVFkWnzGFZYUM9cwn7nH9xdXym6_rKVz5Qph0LV1ggitquOzANwqDA'
});
