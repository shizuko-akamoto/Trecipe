import { Request, Response, NextFunction } from 'express';

/**
 * Generic error handler that responds with given error status code or by default, 500
 */
// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    err,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void {
    const errors = err.errors || [{ message: err.message }];
    res.status(err.status || 500).json({ errors });
}
