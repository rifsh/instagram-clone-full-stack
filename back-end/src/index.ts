import exp, { Express,NextFunction, Request, Response } from 'express';
import { userRouter } from './api/router/userrouter';
import { CustomeError } from './api/utils/customeErrorHandler';
import bodyparser from 'body-parser'

const app:Express = exp();

app.use(bodyparser.json())
app.use(exp.json());

app.use('/linkedin',userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomeError(`Can't find url '${req.originalUrl}' on the server!`, 404);
    next(err);
})

export default app;