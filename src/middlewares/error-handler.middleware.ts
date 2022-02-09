import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.models';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
    switch (true) {
        case error instanceof DatabaseError:
            response.status(StatusCodes.BAD_REQUEST).send(error.message);
            break;
        case error instanceof ForbiddenError:
            response.status(StatusCodes.FORBIDDEN).send(error.message);
            break;
        default:
            response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            break;
    }

}

export default errorHandler;