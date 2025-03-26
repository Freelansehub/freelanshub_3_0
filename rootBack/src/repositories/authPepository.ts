import { ResultSetHeader } from "mysql2";
import db from "./db";
import { UserDbType, UserType } from "./userRepository";

export class AuthRepository {
    static async createUser(newUser: {
        name: string;
        email: string;
        password: string;
        phone: string;
    }): Promise<UserType> {
        try {
            const connection = await db.getConnection();
            const [result] = await connection.query<ResultSetHeader>(
                `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`,
                [newUser.name, newUser.email, newUser.password, newUser.phone]
            );

            if (!result.insertId) {
                throw new Error("Не вдалося створити користувача");
            }

            const [user] = await connection.query<UserDbType[]>(
                `SELECT * FROM users WHERE id = ?`,
                [result.insertId]
            );

            if (!user || user.length === 0) {
                throw new Error("Користувача не знайдено після створення");
            }

            return user[0];
        } catch (error) {
            console.error("Помилка при створенні користувача:", error);
            throw error;
        }
    }
}
