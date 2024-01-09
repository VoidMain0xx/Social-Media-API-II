import exprees from 'express';
import likeController from './like.controller.js';
import jwtAuth from '../../Middleware/jwtAuthentication.js';

const likeRouter = exprees.Router();

const likeControllers = new likeController();

likeRouter.put("/:userId/:postId" , jwtAuth,  (req , res) =>{
    likeControllers.addlike(req , res)
})



export default likeRouter;