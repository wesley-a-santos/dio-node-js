import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoutes = Router();

statusRoutes.get('/status', (request: Request, response: Response, next: NextFunction) => {
    response.status(StatusCodes.OK).send({ foo: 'bar' })
});

export default statusRoutes;