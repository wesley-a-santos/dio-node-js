import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoutes = Router();

statusRoutes.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ foo: 'bar' })
});

export default statusRoutes;