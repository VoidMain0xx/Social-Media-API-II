import commentRepository from "./comment.repository.js";

export default class commentController{
    constructor(){
        this.commentRepository = new commentRepository();
    }

    async comment(req , res){
        try {
            const userId = req.params.userId;
            const postId = req.params.postId;
            const text = req.body;
            if(postId){
                const result = await this.commentRepository.comment(userId ,postId , text);
                res.status(201).send(result);
            }else{
               res.send(404).send("post Not Found");
            }
        } catch (error) {
            console.log(error)
        }
    }
}