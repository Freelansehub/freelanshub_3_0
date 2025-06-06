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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const params_1 = require("../params");
const db = promise_1.default.createPool({
    host: params_1.params.DB_HOST,
    user: params_1.params.DB_USER,
    password: params_1.params.DB_PASS,
    database: params_1.params.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db.getConnection();
        console.log('✅ Підключено до бази даних!');
        connection.release();
    }
    catch (error) {
        console.error('❌ Помилка підключення до бази даних:', error);
        process.exit(1); // Завершити процес при помилці підключення
    }
});
exports.connectDB = connectDB;
exports.default = db;
