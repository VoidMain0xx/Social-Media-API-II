import { getDb } from "../../config/connectToMongodb.js"
import { ObjectId } from "mongodb";
import commentModel from "./comment.model.js";


export default class commentRepository{
    constructor(){
        this.collection = 'post'
    }


    async comment(userId,postid , text){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const result = await collection.updateOne({_id : new ObjectId(postid)} , {
                $push:{
                    comment : new commentModel(userId , text , new ObjectId())
                }
            })

            return result;
        } catch (error) {
            console.log(error)
        }
    }
}