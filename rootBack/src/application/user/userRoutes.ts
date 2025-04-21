import { Request, Response, Router } from "express";
import userController from "./userController";
import authMiddlewares from "../../midellwares/authMiddlewares";
import errorMiddlewares from "../../midellwares/errorMiddlewares";

const userRoutes = Router();

userRoutes.use(errorMiddlewares.errorLink(authMiddlewares.authCheckAccessToken))

userRoutes.get('/', errorMiddlewares.errorLink(userController.getUserById))
userRoutes.patch('/:id',errorMiddlewares.errorLink(userController.updateUserById))
userRoutes.delete('/:id', errorMiddlewares.errorLink(userController.deleteUserById))

userRoutes.use(errorMiddlewares.errorRout('user'))

export default userRoutes