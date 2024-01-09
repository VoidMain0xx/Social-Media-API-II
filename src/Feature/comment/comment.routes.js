import exprees from 'express';
import commentController from './comment.controller.js';

const commentRouter = exprees.Router();

const commentControllers = new commentController();

commentRouter.put('/comment/:postId/:userId' , (req , res) =>{
    commentControllers.comment(req , res)
})

export default commentRouter;
