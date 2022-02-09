import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

async function jwtAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const authorizationHeader = request.headers['authorization'];
        const encriptKey = 'X6yrbMtYn5dEUgmQ';

        if (!authorizationHeader) {
            throw new ForbiddenError('Nenhum Token informado');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        try {
            const tokenPayload = JWT.verify(token, encriptKey);

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError('Token Inválido');
            }

            const uuid = tokenPayload.sub;

            const user = await userRepository.findById(uuid);

            if (!user) {
                throw new ForbiddenError('Usuário não localizado');
            }

            request.user = user;
            next();

        } catch (error) {
            throw new ForbiddenError('Token Inválido');
        }


    } catch (error) {
        next(error);
    }
}


export default jwtAuthenticationMiddleware;