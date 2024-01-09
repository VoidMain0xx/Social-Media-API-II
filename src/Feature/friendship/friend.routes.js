import exprees from'express';
import friendController from './friend.controller.js';

const friendRouter = exprees.Router();

const friendControllers = new friendController();

friendRouter.post('/friendreq/:userid' , (req , res) =>{
    friendControllers.FriendAdd(req , res)
})

friendRouter.put('/friendreqaccepted/:reqid/:userid' ,(req , res) =>{
    friendControllers.FriendReqAccept(req, res);
})

friendRouter.delete('/deletereq/:reqid' , (req , res) =>{
    friendControllers.deleteReq(req , res)
})


export default friendRouter;