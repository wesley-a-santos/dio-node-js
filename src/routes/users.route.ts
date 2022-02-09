import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findById(request.params.uuid);
        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        next(error);
    }
});

usersRoute.put('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    try {
        userRepository.update(request.params.uuid, request.body);
        response.sendStatus(StatusCodes.OK);
    } catch (error) {
        next(error);
    }
});

usersRoute.delete('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    try {
        userRepository.destroy(request.params.uuid)
        response.sendStatus(StatusCodes.OK);
    } catch (error) {
        next(error);
    }
});

usersRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.returnAll();
    response.status(StatusCodes.OK).send(users);
});

usersRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newUser = await userRepository.create(request.body);
        response.status(StatusCodes.CREATED).send(newUser);
    } catch (error) {
        next(error);
    }
});

export default usersRoute;