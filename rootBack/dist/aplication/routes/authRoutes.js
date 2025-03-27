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
exports.authMiddleware = void 0;
const express_1 = require("express");
const authService_1 = require("../../domain/authService");
const jwtService_1 = require("../jwtService");
const userRepository_1 = require("../../repositories/userRepository");
const router = (0, express_1.Router)();
router.post('/registr', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    try {
        const user = yield authService_1.authService.createUser(req.body.name, req.body.password, req.body.email, req.body.phone);
        if (user) {
            const token = jwtService_1.jwtService.createJWT(user);
            res.status(201).json({
                resultcode: 0,
                data: {
                    token
                },
                errors: []
            }); // Возвращаем результат создания
            return;
        }
        res.status(401).send({ errors: ['not create user'], resultCode: 1 });
    }
    catch (error) {
        res.status(404).send({
            resultCode: 1,
            errors: ['not corect data']
        }); // Отправляем сообщение об ошибке
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("login");
        const user = yield authService_1.authService.checkCredentials(req.body.login, req.body.password);
        console.log("-------------------------------------");
        console.log(user);
        if (user) {
            const token = yield jwtService_1.jwtService.createJWT(user); // Передаем user, если нужно
            console.log({
                resultcode: 0,
                data: {
                    token
                },
                errors: []
            });
            res.status(200).send({
                resultcode: 0,
                data: {
                    token
                },
                errors: []
            }); // Возвращаем токен в ответе
            return;
        }
        else {
            console.log('Otpravil Nah');
            res.status(401).send({ errors: ['not corect login or password'], resultCode: 1 }); // Если пользователь не найден
        }
    }
    catch (error) {
        res.status(404).send({ errors: ['not field user'], resultCode: 1 }); // Отправляем сообщение об ошибке
    }
}));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("authMidelWear");
    if (!req.headers.authorization) {
        res.status(401).send('Authorization header missing');
        return;
    }
    console.log("token tut = " + req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    try {
        const userId = yield jwtService_1.jwtService.getUserIdByToken(token);
        console.log("userId = ", userId);
        if (userId) {
            console.log("good");
            req.user = yield userRepository_1.userRepository.findUserById(userId);
            console.log(req.user);
            next();
            return;
        }
        else {
            res.status(401).send('Invalid or expired token');
        }
    }
    catch (error) {
        res.status(401).send('Authorization failed');
    }
});
exports.authMiddleware = authMiddleware;
exports.default = router;
