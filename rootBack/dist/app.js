"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./aplication/routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./aplication/routes/authRoutes"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.REACT_APP_API_URL, // Разрешите запросы с конкретного клиента
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешенные методы
    credentials: true, // Если нужно передавать куки
}));
app.use(express_1.default.json());
app.use('/user', userRoutes_1.default);
app.use('/auth', authRoutes_1.default);
