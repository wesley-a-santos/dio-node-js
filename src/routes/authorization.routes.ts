import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT, { SignOptions } from 'jsonwebtoken'
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';

const config = require('config');
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

        const jwtPayload = { email: user.email };
        const jwtSecretKey = config.get('authentication.jwtSecretKey');
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '10m' };

        const token = JWT.sign(jwtPayload, jwtSecretKey, jwtOptions);

        response.status(StatusCodes.OK).json({ token: token });
    } catch (error) {
        next(error);
    }
});



export default authorizationRoute;