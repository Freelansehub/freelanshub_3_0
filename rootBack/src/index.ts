
import { app } from './app';
import { connectDB } from './repositories/db';

const PORT = process.env.PORT;

// Підключення до бази даних перед стартом сервера
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
    });
};

startServer();