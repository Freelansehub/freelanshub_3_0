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
exports.AuthRepository = void 0;
const db_1 = __importDefault(require("./db"));
class AuthRepository {
    static createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield db_1.default.getConnection();
                const [result] = yield connection.query(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, [newUser.name, newUser.email, newUser.password, newUser.phone]);
                if (!result.insertId) {
                    throw new Error("Не вдалося створити користувача");
                }
                const [user] = yield connection.query(`SELECT * FROM users WHERE id = ?`, [result.insertId]);
                if (!user || user.length === 0) {
                    throw new Error("Користувача не знайдено після створення");
                }
                return user[0];
            }
            catch (error) {
                console.error("Помилка при створенні користувача:", error);
                throw error;
            }
        });
    }
}
exports.AuthRepository = AuthRepository;
