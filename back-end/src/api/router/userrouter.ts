import exp from 'express'
import {userController} from '../controllers/userController'
import { userRouteProtector } from '../middlewares/routeProtectorMiddleware';
import { userAddPostimgUpload, userProfileimgUpload } from '../middlewares/imageUploading';

export const userRouter = exp.Router();


userRouter
.use(userRouteProtector)
.put('/user-profile/:id',userProfileimgUpload,userController.userProfile)
.post('/add-post/:id',userAddPostimgUpload,userController.userAddPost)