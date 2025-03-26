import fs from 'fs';
import mysql from 'mysql2/promise';

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const db = mysql.createPool({
    host: dbHost,
    port: 3306,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,


});

export const connectDB = async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Підключено до бази даних!');
        connection.release();
    } catch (error) {
        console.error('❌ Помилка підключення до бази даних:', error);
        process.exit(1); // Завершити процес при помилці підключення
    }
};

export default db;