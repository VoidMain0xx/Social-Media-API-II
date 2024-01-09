import likeModel from "./like.model.js";
import likeRepository from "./like.repository.js";
export default class likeController{
    constructor(){
        this.likeRepository = new likeRepository();
    }
    async addlike(req , res){
        try {
            const userID = req.userID;
            const userId = req.params.userId;
            const postId = req.params.postId;

            const userlike  = new likeModel(userId , 1);
            console.log(userlike);
            console.log(userID);
            if (userId && postId) {
                const result = await this.likeRepository.like(userId , postId);
                res.status(201).send(result);
            }else{
                res.status(404).send("postid and userid not found")
            }    
        } catch (error) {
            console.log(error);
        }
    }
}