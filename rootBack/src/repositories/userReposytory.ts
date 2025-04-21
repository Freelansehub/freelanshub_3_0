import { UserDBType, UserRoleDBType, UserType } from '../types/types';
import { StatusError, throwError } from '../utils/error';
import pool from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface User extends UserDBType, RowDataPacket {}
interface UserRole extends UserRoleDBType, RowDataPacket {}

class UserRepository {
    async getUserById(userId: number | string) {
        const classError = 'UserRepository';
        const functionError = 'getUserById';

        try {
            const [result] = await pool.query<User[]>(
                `SELECT id, name, email, phone, role_id FROM users WHERE id = ?`,
                [userId]
            );

            if (result.length === 0) {
                return null;
            }

            const role = await this.getUserRoleById(result[0].role_id);

            const user: UserType = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                role: role
            };

            return user;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при отриманні користувача',
                previousError: e
            });
        }
    }

    async getUserRoleById(roleId: string | number) {
        const classError = 'UserRepository';
        const functionError = 'getUserRoleById';

        try {
            const [roledb] = await pool.query<UserRole[]>(
                `SELECT role FROM users_roles WHERE id = ?`,
                [roleId]
            );

            if (roledb.length === 0) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Помилка при отриманні ролі користувача'
                });
            }

            const role: string = roledb[0].role;
            return role;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при отриманні ролі користувача',
                previousError: e
            });
        }
    }
}

export default new UserRepository();
