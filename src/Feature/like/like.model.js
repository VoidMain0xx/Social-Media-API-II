import { ObjectId } from "mongodb";

export default class likeModel{
    constructor(userid , likecount = 0, _id){
        this.userid = userid;
        this.likecount = likecount
        this._id = new ObjectId();
    }
}