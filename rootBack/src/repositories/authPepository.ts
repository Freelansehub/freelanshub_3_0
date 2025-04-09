import { ResultSetHeader } from "mysql2";
import db from "./db";
import { UserDbType, UserType } from "./userRepository";

export class AuthRepository {
    static async createUser(newUser: {
        name: string;
        email: string;
        password: string;
        phone: string;
        role: string;
    }): Promise<UserType> {
        try {
            console.log(newUser.name, newUser.email, newUser.password, newUser.phone, newUser.role)
            const connection = await db.getConnection();
            const [result] = await connection.query<ResultSetHeader>(
                `INSERT INTO user (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
                [newUser.name, newUser.email, newUser.password, newUser.phone, newUser.role]
            );
            console.log("result: ",result)
            if (!result.insertId) {
                throw new Error("Не вдалося створити користувача");
            }

            const [user] = await connection.query<UserDbType[]>(
                `SELECT * FROM user WHERE id = ?`,
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
