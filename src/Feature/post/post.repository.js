import { ObjectId } from "mongodb";
import { getDb } from "../../config/connectToMongodb.js";
import postModel from "./post.Model.js";

export default class postRepository{
constructor(){
    this.collection ="post"
}

    async add(post){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            await collection.insertOne(post);
            return post
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const posts = await collection.find().toArray();
            console.log(posts);
            return posts
        } catch (error) {
            console.log(error);
        }
    }

    async save(id){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const savePost = await collection.updateOne({_id : new ObjectId(id)} , {
                $set: {
                    save: true
                }
            })
            return savePost
        } catch (error) {
            console.log(error);
        }
    }

    

}