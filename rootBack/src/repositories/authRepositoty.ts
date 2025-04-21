import pool from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import userReposytory from './userReposytory';
import { AuthType, UserDBType, UserRoleDBType } from '../types/types';
import { StatusError, throwError } from '../utils/error';

interface User extends UserDBType, RowDataPacket {}
interface UserRole extends UserRoleDBType, RowDataPacket {}

class AuthRepository {
    async createUser(user: Omit<AuthType, 'role' | 'id'>) {
        const classError = 'AuthRepository';
        const functionError = 'createUser';

        try {
            const [result] = await pool.query<ResultSetHeader>(`
                INSERT INTO users (name, email, password, phone, role_id)
                VALUES (?, ?, ?, ?, 1)`, 
                [user.name, user.email, user.password, user.phone]
            );
    
            if (result.affectedRows <= 0) {
                throwError({
                    status: 400,
                    className: classError,
                    functionName: functionError,
                    message: 'Помилка при створенні користувача',
                });
            }
    
            const createUser = await userReposytory.getUserById(result.insertId);
    
            if (!createUser) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Помилка при створенні користувача',
                });
            }
    
            return createUser;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при створенні користувача',
                previousError: e, // передаємо помилку без явного типу
            });
        }
    }

    async getUserByEmail(email: string) {
        const classError = 'AuthRepository';
        const functionError = 'getUserByEmail';

        try {
            const [result] = await pool.query<User[]>(
                `SELECT id, name, email, phone, role_id, password FROM users WHERE email = ?`,
                [email]
            );

            if (result.length === 0) {
                return null;
            }
    
            const [roledb] = await pool.query<UserRole[]>(
                `SELECT role FROM users_roles WHERE id = ?`,
                [result[0].role_id]
            );

            if (roledb.length === 0) {
                throwError({
                    status: 404,
                    className: classError,
                    functionName: functionError,
                    message: 'Користувач не має ролі',
                });
            }
    
            const role: string = roledb[0].role;
            const user: AuthType = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                password: result[0].password,
                role: role
            };
    
            return user;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при отриманні користувача',
                previousError: e, // передаємо помилку без явного типу
            });
        }
    }

    async deleteUser(userId: string) {
        const classError = 'AuthRepository';
        const functionError = 'deleteUser';

        try {
            const [result] = await pool.query<ResultSetHeader>(
                `DELETE FROM refresh_tokens WHERE user_id = ?`,
                [userId]
            );

            if (result.affectedRows === 0) {
                throwError({
                    status: 404,
                    className: classError,
                    functionName: functionError,
                    message: 'Користувач не знайдений для видалення',
                });
            }

            return result.affectedRows > 0;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при видаленні користувача',
                previousError: e, // передаємо помилку без явного типу
            });
        }
    }
}

export default new AuthRepository();
