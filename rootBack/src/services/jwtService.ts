import jwt from "jsonwebtoken";
import { params } from "../config/params";
import refreshTokenRepository from "../repositories/refreshTokenRepository";
import { throwError } from "../utils/error";

class jwtService {
    async createRefreshToken(userId: string, ip: string) {
        const classError = 'jwtService';
        const functionError = 'createRefreshToken';
        const token = jwt.sign({ userId, ip }, params.JWT_REFRESH_SICRET, { expiresIn: "30d" });

        const existingToken = await refreshTokenRepository.getByUserIdAndIp(userId, ip);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

        if (!existingToken) {
            await refreshTokenRepository.create({
                token,
                ip,
                user_id: userId,
                created_at: now,
                expires_at: expiresAt
            });
        } else {
            await refreshTokenRepository.updateByUserIdAndIp({
                token,
                ip,
                user_id: userId,
                created_at: now,
                expires_at: expiresAt
            });
        }

        return token;
    }

    getUserIdAndIpByRefreshToken(token: string) {
        const classError = 'jwtService';
        const functionError = 'getUserIdByRefreshToken';

        try {
            const decoded = jwt.verify(token, params.JWT_REFRESH_SICRET) as { userId: string, ip: string };

            if (decoded && decoded.userId && decoded.ip) {
                return decoded;
            } else {
                throwError({
                    status: 400,
                    className: classError,
                    functionName: functionError,
                    message: 'Неверный refresh токен'
                });
            }
        } catch (e) {
            throwError({
                status: 400,
                className: classError,
                functionName: functionError,
                message: 'Неверный refresh токен',
                previousError: e
            });
        }
    }

    createAccessToken(userId: string) {
        return jwt.sign({ userId }, params.JWT_ACCESS_SICRET, { expiresIn: "30m" });
    }

    getUserIdByAccessToken(token: string) {
        const classError = 'jwtService';
        const functionError = 'getUserIdByAccessToken';

        try {
            const decoded = jwt.verify(token, params.JWT_ACCESS_SICRET) as { userId: string };

            if (decoded && decoded.userId) {
                return decoded.userId;
            } else {
                throwError({
                    status: 400,
                    className: classError,
                    functionName: functionError,
                    message: 'Неверный access токен'
                });
            }
        } catch (e) {
            const nested = e instanceof Error
                ? new Error(`JWT verification failed: ${e.message}`)
                : new Error('Unknown JWT verification error');

            throwError({
                status: 400,
                className: classError,
                functionName: functionError,
                message: 'Неверный access токен',
                previousError: nested
            });
        }
    }

    async createTokens(userId: string, userIp: string) {
        const refreshToken = await this.createRefreshToken(userId, userIp);
        const accessToken = this.createAccessToken(userId);
        return { refreshToken, accessToken };
    }
}

export default new jwtService();
