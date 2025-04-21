import { refreshTokenType } from '../types/types'; 
import { StatusError, throwError } from '../utils/error';
import pool from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface TokenRow extends refreshTokenType, RowDataPacket {}

class RefreshTokenRepository {
    async create(tokenData: Omit<refreshTokenType, 'id'>) {
        const classError = 'RefreshTokenRepository';
        const functionError = 'create';

        try {
            const [result] = await pool.query<ResultSetHeader>(
                `INSERT INTO refresh_tokens (user_id, token, expires_at, created_at, ip)
                 VALUES (?, ?, ?, ?, ?)`,
                [tokenData.user_id, tokenData.token, tokenData.expires_at, tokenData.created_at, tokenData.ip]
            );

            if (result.affectedRows <= 0) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Не вдалося створити refresh токен'
                });
            }

            const token = await this.getByUserIdAndIp(tokenData.user_id, tokenData.ip);
            if (!token) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Refresh токен не знайдений після створення'
                });
            }

            return token[0];
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при створенні refresh токена',
                previousError: e
            });
        }
    }

    async getByUserIdAndIp(userId: string | number, userIp: string) {
        const classError = 'RefreshTokenRepository';
        const functionError = 'getByUserId';

        try {
            const [rows] = await pool.query<TokenRow[]>(
                `SELECT id, user_id, token, expires_at, created_at, ip
                 FROM refresh_tokens
                 WHERE user_id = ? and ip = ?`,
                [userId, userIp]
            );

            return rows.length > 0 ? rows[0] : null;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при отриманні refresh токена',
                previousError: e
            });
        }
    }

    async clearExpires() {
        const classError = 'RefreshTokenRepository';
        const functionError = 'clearExpires';
        const now = new Date();
        try {
            const [result] = await pool.query<ResultSetHeader>(
                `DELETE FROM refresh_tokens
                 WHERE expires_at < ?`,
                [now]
            );

            return result.affectedRows > 0 ? result.affectedRows : null;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при очищенні refresh токенів',
                previousError: e
            });
        }
    }

    async updateByUserIdAndIp(tokenData: Omit<refreshTokenType, 'id'>) {
        const classError = 'RefreshTokenRepository';
        const functionError = 'updateByUserId';

        try {
            const [result] = await pool.query<ResultSetHeader>(
                `UPDATE refresh_tokens
                 SET token = ?, expires_at = ?, created_at = ?, ip = ?
                 WHERE user_id = ? AND ip = ?`,
                [tokenData.token, tokenData.expires_at, tokenData.created_at, tokenData.ip, tokenData.user_id, tokenData.ip]
            );

            if (result.affectedRows <= 0) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Не вдалося оновити refresh токен'
                });
            }

            const token = await this.getByUserIdAndIp(tokenData.user_id, tokenData.ip);
            if (!token) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Refresh токен не знайдений після оновлення'
                });
            }

            return token[0];
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при оновленні refresh токена',
                previousError: e
            });
        }
    }
}

export default new RefreshTokenRepository();
