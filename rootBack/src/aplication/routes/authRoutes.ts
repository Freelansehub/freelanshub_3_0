import { Router, Request, Response, NextFunction } from 'express';
import { authService } from '../../domain/authService';
import { jwtService } from '../jwtService';
import { userRepository } from '../../repositories/userRepository';

const router = Router();

router.post('/registr', async (req: Request, res: Response) => {
    console.log(req.headers.authorization)
    try {
        const user = await authService.createUser(
            req.body.name, 
            req.body.password,
            req.body.email,
            req.body.phone
        );
        if (user){
            const token = jwtService.createJWT(user)
            res.status(201).json({
                resultcode: 0,
                data:{
                    token
                },
                errors:[]
            }); // Возвращаем результат создания
            return;
        }
        res.status(401).send({errors: ['not create user'],resultCode: 1})
    } catch (error) {
        res.status(404).send({
            resultCode: 1,
            errors: ['not corect data']
        }); // Отправляем сообщение об ошибке
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        console.log("login")
        const user = await authService.checkCredentials(req.body.login, req.body.password);
        console.log("-------------------------------------")
        console.log(user)
        if (user) {
            const token = await jwtService.createJWT(user); // Передаем user, если нужно
            console.log({
                resultcode: 0,
                data:{
                    token
                },
                errors:[]
            })
            res.status(200).send({ 
                resultcode: 0,
                data: {
                    token
                },
                errors:[]
             }); // Возвращаем токен в ответе
             return;
        } else {
            console.log('Otpravil Nah')
            res.status(401).send({errors: ['not corect login or password'],resultCode: 1}); // Если пользователь не найден
        }
    } catch (error) {
        res.status(404).send({errors: ['not field user'],resultCode: 1}); // Отправляем сообщение об ошибке
    }
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("authMidelWear")
    if (!req.headers.authorization) {
        res.status(401).send('Authorization header missing');
        return
    }console.log("token tut = " + req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    try {
        const userId = await jwtService.getUserIdByToken(token);
        console.log("userId = ", userId)
        if (userId) {
            console.log("good")
            req.user = await userRepository.findUserById(userId);
            console.log(req.user)
            next();
            return
        } else {
            res.status(401).send('Invalid or expired token');
        }
    } catch (error) {
        res.status(401).send('Authorization failed');
    }
};

export default router;
