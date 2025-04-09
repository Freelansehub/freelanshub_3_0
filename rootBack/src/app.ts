
import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import userRoutes from './aplication/routes/userRoutes';
import authRoutes from './aplication/routes/authRoutes';

const app = express();

const origins = [
  'http://localhost:5173', 
  'http://localhost:4173', 
  'http://localhost:5174', 
  'http://localhost:4174', 
]

const corsOptions = {
  origin: origins, // Allow frontend domain
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));


app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes)


export { app };

