
import mysql from 'mysql2/promise';
import { params } from '../config/params';

const pool = mysql.createPool({
    host: params.DB_HOST,
    user: params.DB_USER,
    password: params.DB_PASS,
    database: params.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,


});


export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Підключено до бази даних!');
        connection.release();
    } catch (error) {
        console.error('❌ Помилка підключення до бази даних:', error);
        process.exit(1); 
    }
};

export default pool;