import { app } from './app';
import { params } from './config/params';
import { connectDB } from './repositories/db';
import refreshTokenRepository from './repositories/refreshTokenRepository';
import { throwError } from './utils/error';

const startServer = async () => {
    try {
        // Підключаємося до бази даних
        await connectDB();

        // Запускаємо сервер
        app.listen(params.PORT, () => {
            console.log(`🚀 Сервер працює на http://localhost:${params.PORT}`);
        });

        // Періодичне очищення застарілих refresh токенів
        setInterval(async () => {
            try {
                const deletedCount = await refreshTokenRepository.clearExpires();
                if (deletedCount) {
                    console.log(`[refreshCleaner] Удалено ${deletedCount} протухших токенов`);
                }
            } catch (err) {
                // Універсальна обробка помилок при очищенні
                throwError({
                    status: 500,
                    className: 'startServer',
                    functionName: 'setInterval',
                    message: 'Ошибка при очистке refresh токенов',
                    previousError: err
                });
            }
        }, 1000 * 60 * 60); // кожну годину
    } catch (err) {
        // Обробка помилок під час старту сервера
        throwError({
            status: 500,
            className: 'startServer',
            functionName: 'startServer',
            message: 'Ошибка при запуске сервера',
            previousError: err
        });
    }
};

startServer();
