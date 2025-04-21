import { NextFunction, Request, Response } from "express";
import { AuthCandidateType } from "../../types/types";
import authService from "../../services/authService";
import jwtService from "../../services/jwtService";
import { getClientIp, setRefreshToken } from "../../utils/auth";
import { throwError } from "../../utils/error";
import refreshTokenRepository from "../../repositories/refreshTokenRepository";

interface TokenRequest extends Request {
    cookies: {
        refreshToken?: string;
        [key: string]: any;
    };
}

class authController {
    async test(req: Request, res: Response, next: NextFunction) {
        throwError({
            status: 404,
            className: 'authController',
            functionName: 'test',
            message: 'Не знайдено',
        });
    }

    async register(req: Request, res: Response) {
        const className = 'authController';
        const functionName = 'register';

        try {

            const candidat: AuthCandidateType = req.body;
            const ip = getClientIp(req);
            const userData = await authService.createUser({ ...candidat, ip });

            setRefreshToken(res, userData.tokens.refreshToken);
            res.status(200).send({user:userData.user, accessToken:userData.tokens.accessToken});
        } catch (e) {
            throwError({
                status: 400,
                className,
                functionName,
                message: 'Помилка під час реєстрації',
                previousError: e,
            });
        }
    }

    async login(req: Request, res: Response) {
        const className = 'authController';
        const functionName = 'login';

        try {
            const ip = getClientIp(req);
            const { email, password }: { email: string; password: string } = req.body;

            const userData = await authService.login(email, password, ip);

            setRefreshToken(res, userData.tokens.refreshToken);
            
            res.status(200).send({user:userData.user, accessToken:userData.tokens.accessToken});
        } catch (e) {
            throwError({
                status: 400,
                className,
                functionName,
                message: 'Помилка під час входу',
                previousError: e,
            });
        }
    }

    async logout(req: Request, res: Response) {
        const className = 'authController';
        const functionName = 'logout';

        try {
            const user = req.user;
            if (!user) {
                throwError({
                    status: 400,
                    className,
                    functionName,
                    message: 'Користувача не знайдено для виходу',
                });
            }

            const isDelete = await authService.logout(user.id);
            res.status(200).send({ isDelete });
        } catch (e) {
            throwError({
                status: 400,
                className,
                functionName,
                message: 'Помилка під час виходу з системи',
                previousError: e,
            });
        }
    }

    async refresh(req: TokenRequest, res: Response) {
        const className = 'authController';
        const functionName = 'refresh';

        try {
            const ip = getClientIp(req);
            const refreshToken = req.cookies.refreshToken as string;

            const user = jwtService.getUserIdAndIpByRefreshToken(refreshToken);
            const refreshTokenInBd = await refreshTokenRepository.getByUserIdAndIp(user.userId, ip)

            if(!refreshTokenInBd || refreshTokenInBd.token !== refreshToken){
                throwError({
                    status: 400,
                    className,
                    functionName,
                    message: 'У вас старий рефреш токен',
                });
            } 


            const tokens = await jwtService.createTokens(user.userId, ip);
            setRefreshToken(res, tokens.refreshToken);
            res.status(200).send(tokens);
        } catch (e) {
            throwError({
                status: 400,
                className,
                functionName,
                message: 'Помилка при оновленні токенів',
                previousError: e,
            });
        }
    }
}

export default new authController();
