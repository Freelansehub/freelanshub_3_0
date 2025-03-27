
import jwt from "jsonwebtoken";
import { UserType } from "../repositories/userRepository";

export const jwtService = {
    async createJWT(user:UserType):Promise<string>{
        const token = jwt.sign({userId:user.id}, "1234", {expiresIn:"24h"});
        return token;
    },
    
    async getUserIdByToken(token: string): Promise<string | null> {
        try {
            // Замените `YOUR_SECRET_KEY` на ваш фактический секретный ключ
            const secretKey = "1234"; 
    
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
