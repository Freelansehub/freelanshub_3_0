import fs from 'fs';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'rocket-da2.hostsila.org',
    port: 3306,
    user: "nkloqzcz_AlexBram",
    password: "Dinger_Boom_007",
    database: "nkloqzcz_FreelansHub",
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