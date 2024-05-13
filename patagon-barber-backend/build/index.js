"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const appointmentRouter_1 = __importDefault(require("./src/routes/appointmentRouter"));
const userRouter_1 = __importDefault(require("./src/routes/userRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3000;
app.use('/api/appointments', appointmentRouter_1.default);
app.use('/api/admin-panel/login', userRouter_1.default);
app.listen(3000, () => {
    console.log(`SERVER is running on port ${PORT}`);
});
