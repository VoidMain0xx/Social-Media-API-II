import { ObjectId } from 'mongodb';
import { getDb } from '../../config/connectToMongodb.js'
import friendsModel from './friend.model.js';
import { request } from 'express';

export default class frirndRepository{
     constructor(){
        this.collection = "frinedReq",
        this.collection2 = "users"
     }

     async friendReq(userId){
        try {
            const db = getDb();
            const collection = db.collection(this.collection)
            const collection2 = db.collection(this.collection2)
            const existUserId = await collection2.findOne({_id : new ObjectId(userId)});
            if (!existUserId) {
                return 'Id not Found'
            }else{
             const Frequest = await collection.insertOne( { FriendReq : new friendsModel(userId , new ObjectId()) });
             return Frequest;
        }
        } catch (error) {
            console.log(error);
        }
     }

    async acceptFriend(reqid, userid){
        const db = getDb();
        const collection = db.collection(this.collection);
        const collection2 = db.collection(this.collection2)
        const existReqID =  await collection.findOne({_id : new ObjectId(reqid)});
        if(!existReqID){
            return 'Id not Found'
        }else{
            
            const reqAccept = await collection2.updateOne({_id : new ObjectId(userid)} , {
                $push:{
                    friends : userid
                }
            });

            await collection.deleteOne({_id : new ObjectId(reqid)});
            return reqAccept;
        }
    }

    async delete(reqid){{
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const existReqID =  await collection.findOne({_id : new ObjectId(reqid)});
        if(!existReqID){
            return 'Id not Found'
        }else{
            const result = await collection.deleteOne({_id : new ObjectId(reqid)});
            return result;
        }
        } catch (error) {
            console.log(error);
        }
    }}


}