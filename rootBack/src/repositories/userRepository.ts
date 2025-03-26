import { RowDataPacket } from "mysql2";
import db from "./db";

// Описуємо тип для користувача
export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
};

// Описуємо тип для даних з бази (додається RowDataPacket для відповідності типу результату запиту)
export interface UserDbType extends RowDataPacket {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

export class userRepository {

    // Знайти користувача за ім'ям або email
    static async findUserByNameOrEmail(nameOrEmail: string): Promise<UserDbType | null> {
        const query = `SELECT id, name, email, password, phone FROM users WHERE name = ? OR email = ?`;
        try {
            const connection = await db.getConnection();
            // Виконуємо запит до бази
            const [rows] = await connection.query<UserDbType[]>(query, [nameOrEmail, nameOrEmail]);
            // Повертаємо користувача або null, якщо не знайдено
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error finding user by name or email:", error);
            return null;
        }
    }

    // Знайти користувача за ID
    static async findUserById(userId: string): Promise<UserDbType | null> {
        const query = `SELECT id, name, email, password, phone FROM users WHERE id = ?`;
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query<UserDbType[]>(query, [userId]);
            return rows.length > 0 ? rows[0] : null;  // Повертаємо користувача або null
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return null;
        }
    }

    // Знайти користувачів за списком ID
    static async findUsersByIds(userIds: string[]): Promise<UserDbType[]> {
        const query = `SELECT id, name, email, password, phone FROM users WHERE id IN (?)`;
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query<UserDbType[]>(query, [userIds]);
            return rows;  // Повертаємо масив знайдених користувачів
        } catch (error) {
            console.error("Error finding users by IDs:", error);
            return [];
        }
    }
}
