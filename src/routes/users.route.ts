import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findById(req.params.uuid);
        res.status(StatusCodes.OK).send(users);
    } catch (error) {
        next(error);
    }
});

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        userRepository.update(req.params.uuid, req.body);
        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        next(error);
    }
});

usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        userRepository.destroy(req.params.uuid)
        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        next(error);
    }
});

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.returnAll();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userRepository.create(req.body);
        res.status(StatusCodes.CREATED).send(newUser);
    } catch (error) {
        next(error);
    }
});

export default usersRoute;