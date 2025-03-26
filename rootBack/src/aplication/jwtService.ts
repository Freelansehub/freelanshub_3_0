
import jwt from "jsonwebtoken";
import { UserType } from "../repositories/userRepository";
import { params } from "../params";

export const jwtService = {
    async createJWT(user:UserType):Promise<string>{
        const token = jwt.sign({userId:user.id}, params.JWT_SICRET, {expiresIn:"24h"});
        return token;
    },
    
    async getUserIdByToken(token: string): Promise<string | null> {
        try {
            // Замените `YOUR_SECRET_KEY` на ваш фактический секретный ключ
            const secretKey = params.JWT_SICRET; 
    
            // Расшифровываем токен
            const decoded = jwt.verify(token, secretKey) as { userId: string };
    
            // Проверяем, содержит ли декодированный объект `userId`
            if (decoded && decoded.userId) {
                return decoded.userId; // Преобразуем userId в ObjectId
            } else {
                return null; // Возвращаем null, если userId отсутствует
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            return null; // Возвращаем null при ошибке
        }
    }
}
