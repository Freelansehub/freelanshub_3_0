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
exports.userRepository = void 0;
const db_1 = __importDefault(require("./db"));
class userRepository {
    // Знайти користувача за ім'ям або email
    static findUserByNameOrEmail(nameOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, name, email, password, phone FROM users WHERE name = ? OR email = ?`;
            try {
                const connection = yield db_1.default.getConnection();
                // Виконуємо запит до бази
                const [rows] = yield connection.query(query, [nameOrEmail, nameOrEmail]);
                // Повертаємо користувача або null, якщо не знайдено
                return rows.length > 0 ? rows[0] : null;
            }
            catch (error) {
                console.error("Error finding user by name or email:", error);
                return null;
            }
        });
    }
    // Знайти користувача за ID
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, name, email, password, phone FROM users WHERE id = ?`;
            try {
                const connection = yield db_1.default.getConnection();
                const [rows] = yield connection.query(query, [userId]);
                return rows.length > 0 ? rows[0] : null; // Повертаємо користувача або null
            }
            catch (error) {
                console.error("Error finding user by ID:", error);
                return null;
            }
        });
    }
    // Знайти користувачів за списком ID
    static findUsersByIds(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, name, email, password, phone FROM users WHERE id IN (?)`;
            try {
                const connection = yield db_1.default.getConnection();
                const [rows] = yield connection.query(query, [userIds]);
                return rows; // Повертаємо масив знайдених користувачів
            }
            catch (error) {
                console.error("Error finding users by IDs:", error);
                return [];
            }
        });
    }
}
exports.userRepository = userRepository;
