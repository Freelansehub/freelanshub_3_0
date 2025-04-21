import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwtService";
import userService from "../services/userService";
import { StatusError, throwError } from "../utils/error";

interface TokenRequest extends Request {
    cookies: {
        refreshToken?: string;
        [key: string]: any;
    };
}

class authMiddlewares {
    async authCheckRefreshToken(req: TokenRequest, res: Response, next: NextFunction) {
        const classError = 'authMiddlewares';
        const functionError = 'authCheckRefreshToken';

        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throwError({
                    status: 401,
                    className: classError,
                    functionName: functionError,
                    message: 'Не надано refresh token',
                });
            }

            const userId = jwtService.getUserIdAndIpByRefreshToken(refreshToken);
            if (!userId) {
                throwError({
                    status: 401,
                    className: classError,
                    functionName: functionError,
                    message: 'Невалідний або термін дії refresh token закінчився',
                });
            }

            next();
        } catch (e) {
            throwError({
                status: 401,
                className: classError,
                functionName: functionError,
                message: 'Невалідний або термін дії refresh token закінчився',
                previousError: e, // передаємо саму помилку без явного типу
            });
        }
    }

    async authCheckAccessToken(req: TokenRequest, res: Response, next: NextFunction) {
        const classError = 'authMiddlewares';
        const functionError = 'authCheckAccessToken';

        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                throwError({
                    status: 404,
                    className: classError,
                    functionName: functionError,
                    message: 'Access token не передано в заголовку',
                });
            }

            const token = accessToken.split(' ')[1];
            const userId = jwtService.getUserIdByAccessToken(token);

            if (userId) {
                req.user = await userService.getUserById(userId);
                next();
            } else {
                throwError({
                    status: 401,
                    className: classError,
                    functionName: functionError,
                    message: 'Невалідний або термін дії access token закінчився',
                });
            }
        } catch (e) {
            throwError({
                status: 401,
                className: classError,
                functionName: functionError,
                message: 'Невалідний або термін дії access token закінчився',
                previousError: e, // передаємо саму помилку без явного типу
            });
        }
    }
}

export default new authMiddlewares();
