import exp, { Express,NextFunction, Request, Response } from 'express';
import { userAuthRouter } from './api/router/authRouter';
import { CustomeError } from './api/utils/customeErrorHandler';
import bodyparser from 'body-parser'
import cors from 'cors'
import { userRouter } from './api/router/userrouter';
import { postRouter } from './api/router/userPostRouter';

const app:Express = exp();
const corsOptions = {
    origin:"https://instagram-clone-full-stack-2lhn.vercel.app",
    credentials: true,
    optionSuccessStatus:200,
}

app.use(bodyparser.json())
app.use(exp.json());
app.use(cors(corsOptions));

app.use('/clone',userAuthRouter,userRouter);
app.use('/post',postRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomeError(`Can't find url '${req.originalUrl}' on the server!`, 404);
    next(err);
})

export default app;