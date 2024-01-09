import { ObjectId } from "mongodb";

export default class commentModel{
    constructor(userId , text , _id){
        this.userId = userId,
        this.text = text,
        this._id = new ObjectId;
    }
}