"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.params = void 0;
require('dotenv').config();
exports.params = {
    DB_HOST: process.env.DB_HOST || "rocket-da2.hostsila.org",
    DB_USER: process.env.DB_USER || "nkloqzcz_AlexBram",
    DB_PASS: process.env.DB_PASS || "Dinger_Boom_007",
    DB_NAME: process.env.DB_NAME || "nkloqzcz_FreelansHub",
    PORT: Number(process.env.PORT) || 3306
};
