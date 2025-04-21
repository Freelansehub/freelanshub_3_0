import dotenv from 'dotenv';
dotenv.config();

export const params = {
    DB_HOST: process.env.DB_HOST || "rocket-da2.hostsila.org",
    DB_USER: process.env.DB_USER || "nkloqzcz_AlexBram",
    DB_PASS: process.env.DB_PASS || "Dinger_Boom_007",
    DB_NAME: process.env.DB_NAME || "nkloqzcz_FreelansHub",
    JWT_REFRESH_SICRET: process.env.JWT_REFRESH_SICRET || 'UltraMegaDuperSkladniPassword',
    JWT_ACCESS_SICRET: process.env.JWT_REFRESH_SICRET || 'UltraMegaSkladniPassword',
    PORT: Number(process.env.PORT) || 5000
}