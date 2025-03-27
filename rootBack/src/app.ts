
import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './aplication/routes/userRoutes';
import authRoutes from './aplication/routes/authRoutes';

const app = express();

app.use(cors({
    origin: process.env.REACT_APP_API_URL, // Разрешите запросы с конкретного клиента
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешенные методы
    credentials: true, // Если нужно передавать куки
}));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes)


export { app };