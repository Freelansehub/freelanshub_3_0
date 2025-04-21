import { Router } from "express";
import authController from "./authController";
import authMiddlewares from "../../midellwares/authMiddlewares";
import errorMiddlewares from "../../midellwares/errorMiddlewares";
import { body } from "express-validator";
const authRoutes = Router();

authRoutes.post('/register', 
    body('email').isEmail(),
    body('password').isLength({min:6, max:15}),
    errorMiddlewares.errorLink(authController.register)
)

authRoutes.get('/refresh', 
    errorMiddlewares.errorLink(authController.refresh)
)

authRoutes.post('/login', 
    body('email').isEmail(),
    body('password').isLength({min:6, max:15}),
    errorMiddlewares.errorLink(authController.login)
)

authRoutes.post('/logout',
    authMiddlewares.authCheckAccessToken, 
    errorMiddlewares.errorLink(authController.logout)
)

authRoutes.post('/test', 
    errorMiddlewares.errorLink(authController.test)
)

authRoutes.use(errorMiddlewares.errorRout('auth'))
export default authRoutes