import exp from 'express';
import { userAddPostimgUpload } from '../middlewares/imageUploading';
import { userPostController } from '../controllers/userPostController';

export const postRouter = exp.Router();

postRouter
// .use(userRouteProtector)
.post('/add-post/:id', userAddPostimgUpload, userPostController.userAddPost)
.get('/get-post', userPostController.getPost)
.get('/get-post-byId/:id', userPostController.getPostById)
.post('/like-post/:id', userPostController.likePost)
.post('/add-comment/:id', userPostController.addComment)
.get('/post-comment/:id', userPostController.postComments)
.post('/delete-post/:id', userPostController.deletePost)