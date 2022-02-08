import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.models';

function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
    switch (true) {
        case error instanceof DatabaseError:
            response.sendStatus(StatusCodes.BAD_REQUEST);
            break;
        default:
            response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            break;
    }

}

export default errorHandler;