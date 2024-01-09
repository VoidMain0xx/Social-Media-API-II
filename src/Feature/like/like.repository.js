import { ObjectId } from "mongodb";
import { getDb } from "../../config/connectToMongodb.js";
import likeModel from "./like.model.js";
import postModel from "../post/post.Model.js";
import UserRepository from "../user/user.repository.js";
export default class likeRepository{

    constructor(){
        this.collection = 'post'
    }

    async like(userid , postid){
        try{
        const db = getDb();
        const collection = db.collection(this.collection);
          await collection.updateOne({_id : new ObjectId(postid)} , {
            $pull:{
                likes : new likeModel(userid , 1 , new ObjectId())
            }
        })

             await collection.updateOne({_id : new ObjectId(postid)} , {
                $push:{
                    likes : new likeModel(userid , 1 , new ObjectId())
                }
            })
        
            return 'task performed'

        }catch(err){
            console.log(err);
        }
    }
}