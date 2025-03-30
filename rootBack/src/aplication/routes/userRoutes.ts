import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../../domain/userService';
import { authMiddleware } from './authRoutes';
import db from '../../repositories/db';
import { UserDbType } from '../../repositories/userRepository';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        // if (req.user) {
        //     res.status(200).send({
        //         data:{
        //             _id: req.user._id,
        //             name: req.user.name,
        //             email: req.user.email,
        //             phone: req.user.phone,
        //             role: req.user.role,
        //             specialization: req.user.specialization,
        //             position: req.user.position
        //         },
        //         resultCode: 0,
        //         errors: []
        //     })
        // }

        res.send({
            masseg: "conect"
        })
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors:['not corect user']
        })
    }
})

router.get('/coursIds', async (req: Request, res: Response) => {
    try {
        if (req.user) {
            res.status(200).send({
                data: {coursIds: req.user.courses},
                resultCode: 0,
                errors: []
            })
        }
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors:['not corect user']
        })
    }
})

router.get('/user', async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM user `;
        const connection = await db.getConnection();
            // Виконуємо запит до бази
        const [rows] = await connection.query<UserDbType[]>(query);

        res.status(200).send({
            rows
        })
    }
    catch (error) {
        res.status(403).send({
            resultCode: 0,
            errors:['not corect user']
        })
    }
})


export default router;
