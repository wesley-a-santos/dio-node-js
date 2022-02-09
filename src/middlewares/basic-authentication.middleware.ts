import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

async function basicAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não foram informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [email, password] = tokenContent.split(':')

        if (!email || !password) {
            throw new ForbiddenError('Credenciais não foram informadas');
        }

        const user = await userRepository.authenticate(email, password);

        if (!user) {
            throw new ForbiddenError('Usuário ou senha invalidos');
        }

        request.user = user;

        next();

    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;