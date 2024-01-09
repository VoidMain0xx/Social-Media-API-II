import exprees from 'express';
import postController from './post.Controller.js';
import { upload } from '../../Middleware/fileUploadMiddleware.js';

const postRouter = exprees.Router();

const PostController = new postController();

postRouter.post('/add', upload.single('media'), (req, res) => {
    PostController.addpost(req, res);
});
postRouter.get('/', (req, res) => {
    PostController.getAllPost(req, res)
})
postRouter.put('/save/:id', (req, res) => {
    PostController.save(req, res);
})


export default postRouter;