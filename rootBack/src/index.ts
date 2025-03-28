
import { app } from './app';
import { params } from './params';
import { connectDB } from './repositories/db';


// Підключення до бази даних перед стартом сервера
const startServer = async () => {
    await connectDB();

    app.listen(8080, () => {
        console.log(`🚀 Сервер працює на http://localhost:${8080}`);
    });
};

startServer();