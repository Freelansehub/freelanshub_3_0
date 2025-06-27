
import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './application/user/userRoutes';
import authRoutes from './application/auth/authRoutes';
import { params } from './config/params';
const app = express();

const origins = params.ORIGINS.split(' ')

const corsOptions = {
  origin: origins, // Allow frontend domain
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUTCH', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.set('trust proxy', true); 
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes)
app.use('/user', userRoutes);
app.use('/auth', cookieParser(), authRoutes);

export { app };

