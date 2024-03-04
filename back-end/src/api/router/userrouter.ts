import exp from 'express'
import {userController} from '../controllers/userController'
import { userRouteProtector } from '../middlewares/routeProtectorMiddleware';
import { userProfileimgUpload } from '../middlewares/imageUploading';

export const userRouter = exp.Router();


userRouter
.use(userRouteProtector)
.get('/users',userController.allUser)
.get('/user-by-id/:id',userController.userById)
.put('/user-profile/:id',userController.userProfile)
.put('/user-profile-img/:id',userProfileimgUpload,userController.profileImgChange)
.post('/user-following/:id',userController.userFollowing)
.delete('/user-profile-remove/:id',userController.profileImgRemove)