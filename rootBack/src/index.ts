
import { app } from './app';
import { params } from './params';
import { connectDB } from './repositories/db';


// Підключення до бази даних перед стартом сервера
const startServer = async () => {
    await connectDB();

    app.listen(5000, () => {
        console.log(`🚀 Сервер працює на http://localhost:${5000}`);
    });
};

startServer();