import { ObjectId } from "mongodb";

export default class friendsModel{
    constructor(userid , _id){
        this.userid = userid;
        this._id = new ObjectId();
    }
}