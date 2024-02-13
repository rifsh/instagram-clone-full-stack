import exp from 'express';
import { userAddPostimgUpload } from '../middlewares/imageUploading';
import { userRouteProtector } from '../middlewares/routeProtectorMiddleware';
import { userPostController } from '../controllers/userPostController';

export const postRouter = exp.Router();

postRouter
// .use(userRouteProtector)
.post('/add-post/:id', userAddPostimgUpload, userPostController.userAddPost)
.get('/get-post', userPostController.getPost)
.get('/get-post-byId/:id', userPostController.getPostById) 
.delete('/delete-post/:id', userPostController.deletePost)