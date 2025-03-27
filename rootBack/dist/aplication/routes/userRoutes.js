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
const express_1 = require("express");
const db_1 = __importDefault(require("../../repositories/db"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (req.user) {
        //     res.status(200).send({
        //         data:{
        //             _id: req.user._id,
        //             name: req.user.name,
        //             email: req.user.email,
        //             phone: req.user.phone,
        //             role: req.user.role,
        //             specialization: req.user.specialization,
        //             position: req.user.position
        //         },
        //         resultCode: 0,
        //         errors: []
        //     })
        // }
        res.send({
            masseg: "conect"
        });
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors: ['not corect user']
        });
    }
}));
router.get('/coursIds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            res.status(200).send({
                data: { coursIds: req.user.courses },
                resultCode: 0,
                errors: []
            });
        }
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors: ['not corect user']
        });
    }
}));
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM user `;
        const connection = yield db_1.default.getConnection();
        // Виконуємо запит до бази
        const [rows] = yield connection.query(query);
        res.send({
            rows
        });
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors: ['not corect user']
        });
    }
}));
exports.default = router;
