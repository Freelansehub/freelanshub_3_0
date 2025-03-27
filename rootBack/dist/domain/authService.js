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
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../repositories/userRepository");
const authPepository_1 = require("../repositories/authPepository");
exports.authService = {
    createUser(name, password, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                name,
                password: passwordHash,
                email,
                phone
            };
            try {
                const createdUser = yield authPepository_1.AuthRepository.createUser(newUser);
                return createdUser;
            }
            catch (error) {
                console.error("Error creating user:", error);
                return null;
            }
        });
    },
    checkCredentials(nameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.userRepository.findUserByNameOrEmail(nameOrEmail);
            console.log(user);
            if (!user)
                return null;
            const result = yield bcryptjs_1.default.compare(password, user.password);
            return result ? user : null;
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate the hash of the password using bcrypt
            console.log("user password = " + password);
            const hash = bcryptjs_1.default.hash(password, salt);
            return hash;
        });
    },
};
