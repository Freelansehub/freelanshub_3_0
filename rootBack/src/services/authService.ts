import { AuthCandidateType, UserType } from "../types/types";
import bcryptjs from "bcryptjs";
import authRepositoty from "../repositories/authRepositoty";
import jwtService from "./jwtService";
import { StatusError, throwError } from "../utils/error";

class AuthService {
    async createUser(user: AuthCandidateType) {
        const classError = 'authService';
        const functionError = 'createUser';

        try {
            const findUser = await authRepositoty.getUserByEmail(user.email);
            if (findUser) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Такий користувач вже є',
                });
            }

            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await this._generateHash(user.password, salt);

            const createUser = await authRepositoty.createUser({ ...user, password: hashPassword });
            
            if (!createUser) {
                throwError({
                    status: 400,
                    className: classError,
                    functionName: functionError,
                    message: 'Помилка при створенні користувача',
                });
            }

            const tokens = await jwtService.createTokens(createUser.id, user.ip);
            return { user: createUser, tokens };
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при створенні користувача',
                previousError: e,
            });
        }
    }

    async login(email: string, password: string, ip: string) {
        const classError = 'authService';
        const functionError = 'login';

        try {
            const user = await this.checkCredentials(email, password);
            if (!user) {
                throwError({
                    status: 404,
                    className: classError,
                    functionName: functionError,
                    message: 'Користувач не знайдений або неправильний пароль',
                });
            }

            const tokens = await jwtService.createTokens(user.id, ip);
            const { id, ...validUser } = user;
            return { user: validUser, tokens };
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при авторизації',
                previousError: e,
            });
        }
    }

    async logout(userId: string) {
        const classError = 'authService';
        const functionError = 'logout';

        try {
            const isDelete = await authRepositoty.deleteUser(userId);
            if (!isDelete) {
                throwError({
                    status: 500,
                    className: classError,
                    functionName: functionError,
                    message: 'Помилка при видаленні користувача',
                });
            }

            return isDelete;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при виконанні logout',
                previousError: e,
            });
        }
    }

    async checkCredentials(email: string, inputPassword: string) {
        const classError = 'authService';
        const functionError = 'checkCredentials';

        try {
            const user = await authRepositoty.getUserByEmail(email);
            if (!user) {
                return null;
            }
            const { password, ...userInfo } = user;
            const result = await bcryptjs.compare(inputPassword, password);
            return result ? userInfo : null;
        } catch (e) {
            throwError({
                status: 500,
                className: classError,
                functionName: functionError,
                message: 'Помилка при перевірці облікових даних',
                previousError: e,
            });
        }
    }

    private async _generateHash(password: string, salt: string) {
        return bcryptjs.hash(password, salt);
    }
}

export default new AuthService();
