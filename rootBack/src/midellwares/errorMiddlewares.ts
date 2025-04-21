import { NextFunction, Request, Response } from "express";
import { StatusError, throwError } from "../utils/error";
import { validationResult } from "express-validator";

type handler = (req: Request, res: Response, next: NextFunction) => Promise<void>

class errorMiddlewares {

  errorRout(rout: string) {
    return (err: Error | StatusError, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof StatusError) {
        const status = err.errorChain?.[0]?.status || 500;
        const message = err.errorChain?.[0]?.message || 'Internal Server Error';
        const errors = err.errorChain?.[0]?.errors || [];

        console.log(`\n━━━━━[rout:${rout}]:[link:${req.path}]:[method:${req.method}]━━━━━\n`, err.toString());

        res.status(status).json({ status, message, errors });
      } else {
        console.error(`\n━━━━━[rout:${rout}]:[link:${req.path}]:[method:${req.method}]━━━━━\n`, err.stack);
        res.status(500).json({
          status: 500,
          message: err.message || 'Unexpected error',
        });
      }
    };
  }

  errorLink(handler: handler) {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          throwError({
            status: 400,
            className: `${req.path}Router`,
            functionName: `validationMiddleware`,
            message: 'Помилка валідації даних',
            errors: errors.array(),
          })
        )
      }
      Promise.resolve(handler(req, res, next)).catch((e) => {
        next(e)
      });
    };
  }
}

export default new errorMiddlewares()