import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT, { SignOptions } from 'jsonwebtoken'
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';
const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(200);
});

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user;

        if (!user) {
            throw new ForbiddenError('Usuário ou senha invalidos');
        }

        const payload = { email: user.email };
        const encriptKey = 'X6yrbMtYn5dEUgmQ';
        const options: SignOptions = { subject: user?.uuid, expiresIn: '10m' };

        const token = JWT.sign(payload, encriptKey, options);

        response.status(StatusCodes.OK).json({ token: token });
    } catch (error) {
        next(error);
    }
});



export default authorizationRoute;